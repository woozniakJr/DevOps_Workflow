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
