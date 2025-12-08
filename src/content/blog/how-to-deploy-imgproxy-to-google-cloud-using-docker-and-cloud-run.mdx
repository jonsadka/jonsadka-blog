---
path: '/blog/how-to-deploy-imgproxy-to-google-cloud-using-docker-and-cloud-run'
date: '1590562800000'
published: true
tags: ['Infrastructure']
title: 'How to deploy imgproxy to Google Cloud using Docker and Cloud Run'
---

### Goal

Be able to host a production instance of imgproxy on Google Cloud within minutes.

### First time installation

1. Open the Cloud Terminal

1. Follow the `Before you begin` section listed here (https://cloud.google.com/container-registry/docs/pushing-and-pulling)

   - `$ sudo usermod -a -G docker ${USER}`
   - `$ gcloud auth configure-docker`

1. Pull the latest docker image (https://docs.imgproxy.net/#/installation)

   - `$ docker pull darthsim/imgproxy:latest`

1. Tag the container

   - `$ docker tag darthsim/imgproxy gcr.io/xxxxx-public-assets/imgproxy`

1. Push the container

   - `$ docker push gcr.io/xxxxx-public-assets/imgproxy`
   - Copy the sha (i.e. `sha256:12345...54321`)

1. Head to `Cloud Run`

1. Create Service

   - Enter your service name (i.e. `xxxxx-imgproxy-production`)
   - Click `Allow unauthenticated invocations`
   - Hit Next, click `Select` on the input and search for the desired image
     - Alternatively, manually build the url and paste the sha (or `gcr.io/xxxxx-public-assets/imgproxy@sha256:12345...54321`)

1. Add any environment variables like `IMGPROXY_KEY` and `IMGPROXY_SALT`
   - See https://cloud.google.com/run/docs/configuring/environment-variables

### Updating the image

1. Open the Cloud Terminal

1. Follow the `Before you begin` section listed here (https://cloud.google.com/container-registry/docs/pushing-and-pulling)

   - `$ sudo usermod -a -G docker ${USER}`
   - `$ gcloud auth configure-docker`

1. Pull the latest docker image (https://docs.imgproxy.net/#/installation)

   - `$ docker pull darthsim/imgproxy:latest`

1. Tag the container

   - `$ docker tag darthsim/imgproxy gcr.io/xxxxx-public-assets/imgproxy`

1. Push the container

   - `$ docker push gcr.io/xxxxx-public-assets/imgproxy`
   - Copy the sha (i.e. `sha256:12345...54321`)

1. Head to `Cloud Run`

1. Click on the name of the service you wish to update (i.e. `xxxxx-imgproxy-production`)

1. Click `Edit & Depoly New Revision` at the top of the page

1. Slick `Select` on the input and search for the desired image
   - Alternatively, manually build the url and paste the sha (or `gcr.io/xxxxx-public-assets/imgproxy@sha256:12345...54321`)
