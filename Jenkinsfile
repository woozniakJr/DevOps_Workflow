pipeline {
  agent any

  environment {
    // Remplace par ton namespace Docker Hub
    DOCKER_NAMESPACE = "mouhamed2555"
    FRONTEND_IMAGE = "${DOCKER_NAMESPACE}/frontend:latest"
    BACKEND_IMAGE  = "${DOCKER_NAMESPACE}/backend:latest"
  }

  stages {
    stage('Build Backend Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME_BACKEND ./backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME_FRONTEND ./frontend'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'devflow', usernameVariable: 'mouhamed2555', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME_BACKEND
            docker push $IMAGE_NAME_FRONTEND
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
