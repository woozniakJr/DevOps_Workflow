pipeline {
  agent any

  environment {
    DOCKER_NAMESPACE = "mouhamed2555"
    FRONTEND_IMAGE = "${DOCKER_NAMESPACE}/frontend:latest"
    BACKEND_IMAGE  = "${DOCKER_NAMESPACE}/backend:latest"
  }

  stages {
    stage('Install Trivy') {
      steps {
        sh '''
          echo "🔧 Installing Trivy..."
          curl -sfL https://github.com/aquasecurity/trivy/releases/latest/download/trivy_0.64.1_Linux-64bit.deb -o trivy.deb
          sudo dpkg -i trivy.deb
          trivy --version
        '''
      }
    }

    stage('Build Backend Image') {
      steps {
        sh 'docker build -t $BACKEND_IMAGE ./backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t $FRONTEND_IMAGE ./frontend'
      }
    }

    stage('Scan Docker Images with Trivy') {
      steps {
        sh '''
          mkdir -p trivy-reports
          echo "🔍 Scan Backend image..."
          trivy image --severity CRITICAL,HIGH --format json -o trivy-reports/backend-report.json $BACKEND_IMAGE

          echo "🔍 Scan Frontend image..."
          trivy image --severity CRITICAL,HIGH --format json -o trivy-reports/frontend-report.json $FRONTEND_IMAGE
        '''
      }
      post {
        always {
          archiveArtifacts artifacts: 'trivy-reports/*.json', allowEmptyArchive: true
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'devflow', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $BACKEND_IMAGE
            docker push $FRONTEND_IMAGE
          '''
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh 'docker-compose down && docker-compose up -d'
      }
    }
  }
}
