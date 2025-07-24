pipeline {
  agent any

  environment {
    DOCKER_NAMESPACE = "mouhamed2555"
    FRONTEND_IMAGE = "${DOCKER_NAMESPACE}/frontend:latest"
    BACKEND_IMAGE  = "${DOCKER_NAMESPACE}/backend:latest"
  }


    stage('Build Backend Image') {
      steps {
        bat 'docker build -t %BACKEND_IMAGE% ./backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        bat 'docker build -t %FRONTEND_IMAGE% ./frontend'
      }
    }

    stage('Scan Docker Images with Trivy') {
      steps {
        script {
          def reportDir = "${env.WORKSPACE}\\trivy-reports"

          // Créer le dossier s'il n'existe pas
          bat """
            if not exist "${reportDir}" mkdir "${reportDir}"
          """

          // Scanner l'image backend
          bat """
            docker run --rm ^
              -v //var/run/docker.sock:/var/run/docker.sock ^
              -v "${reportDir.replace('\\\\','/')}:/reports" ^
              aquasec/trivy:0.64.1 ^
              image --severity CRITICAL,HIGH --format json -o /reports/backend-report.json %BACKEND_IMAGE%
          """

          // Scanner l'image frontend
          bat """
            docker run --rm ^
              -v //var/run/docker.sock:/var/run/docker.sock ^
              -v "${reportDir.replace('\\\\','/')}:/reports" ^
              aquasec/trivy:0.64.1 ^
              image --severity CRITICAL,HIGH --format json -o /reports/frontend-report.json %FRONTEND_IMAGE%
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
          bat '''
            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            docker push %BACKEND_IMAGE%
            docker push %FRONTEND_IMAGE%
          '''
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        bat 'docker-compose down && docker-compose up -d'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline exécuté avec succès.'
    }
    failure {
      echo '❌ Échec du pipeline.'
    }
  }
}
