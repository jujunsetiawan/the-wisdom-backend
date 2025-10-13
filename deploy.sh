set -e

NAME="the-wisdom-backend-api"
USERNAME="juntakeda10"
IMAGE="$USERNAME/$NAME:latest"

echo "Building Docker Image ..."
docker build -t $IMAGE .

echo "Pushing image to Docker Hub ..."
docker push $IMAGE

echo "Applying Kubernetes manifests ..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "Getting Pods ..."
kubectl get pods

echo "Getting sservices ..."
kubectl get services

echo "Fetching the main service"
kubectl get services kubernetes-wisdom-api-service