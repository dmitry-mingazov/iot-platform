pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p :3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                sh "chmod +x -R ${env.WORKSPACE}"
                sh './jenkins/scripts/frontendTest.sh' 
            }
        }
    }
}