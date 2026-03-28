pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/prateekgajbar/microservices-ci-cd.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}