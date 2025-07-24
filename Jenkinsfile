pipeline {
  agent any

  environment {
    DOCKER_NAMESPACE = "mouhamed2555"
    FRONTEND_IMAGE = "${DOCKER_NAMESPACE}/frontend:latest"
    BACKEND_IMAGE  = "${DOCKER_NAMESPACE}/backend:latest"
    TRIVY_VERSION = "0.64.1"
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

    stage('Scan Docker Images with Trivy') {
      steps {
        script {
          // Chemin absolu pour Windows - Crée un dossier indépendant
          def reportDir = "${env.WORKSPACE}/trivy-reports"

          // Crée le dossier pour éviter l'erreur "no such file"
          bat "mkdir \"${reportDir}\""

          // Lance le scan backend
          bat """
          docker run --rm ^
            -v //var/run/docker.sock:/var/run/docker.sock ^
            -v "${reportDir.replace('\\', '/')}:/reports" ^
            aquasec/trivy:$TRIVY_VERSION ^
            image --severity CRITICAL,HIGH --format json ^
            -o /reports/backend-report.json $BACKEND_IMAGE
          """

          // Lance le scan frontend
          bat """
          docker run --rm ^
            -v //var/run/docker.sock:/var/run/docker.sock ^
            -v "${reportDir.replace('\\', '/')}:/reports" ^
            aquasec/trivy:$TRIVY_VERSION ^
            image --severity CRITICAL,HIGH --format json ^
            -o /reports/frontend-report.json $FRONTEND_IMAGE
          """
        }
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
          bat """
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $BACKEND_IMAGE
            docker push $FRONTEND_IMAGE
          """
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        bat 'docker-compose down || exit 0 && docker-compose up -d'
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
