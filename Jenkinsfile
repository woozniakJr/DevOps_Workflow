pipeline {
  agent any

  environment {
    DOCKER_NAMESPACE = "mouhamed2555"
    FRONTEND_IMAGE = "${DOCKER_NAMESPACE}/frontend:latest"
    BACKEND_IMAGE  = "${DOCKER_NAMESPACE}/backend:latest"
  }

  stages {

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

    stage('Scan Docker Images with Trivy (via Docker)') {
      steps {
        sh '''
          mkdir -p trivy-reports

          echo "🔍 Scan Backend image with Trivy..."
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v $(pwd)/trivy-reports:/reports \
            aquasec/trivy:0.64.1 \
            image --severity CRITICAL,HIGH --format json -o /reports/backend-report.json $BACKEND_IMAGE

          echo "🔍 Scan Frontend image with Trivy..."
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v $(pwd)/trivy-reports:/reports \
            aquasec/trivy:0.64.1 \
            image --severity CRITICAL,HIGH --format json -o /reports/frontend-report.json $FRONTEND_IMAGE
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

  post {
    failure {
      echo "❌ Échec du pipeline."
    }
    success {
      echo "✅ Pipeline exécuté avec succès !"
    }
  }
}
