# kong-react-admin
This is a dashboard for [Kong api gateway](https://docs.konghq.com/). This project was started due outdated version of [PGBI/kong-dashboard](https://github.com/PGBI/kong-dashboard)

# Status

There are a lot of bugs, but I use it more and more often than CURL. As I personally not a frontend developer help is appreciated!

# Installation

Currently only docker image is available. I plan to add npm package with cmd tool.

## Using Docker

[![](https://images.microbadger.com/badges/image/kepkin/kong-react-admin.svg)](https://microbadger.com/images/kepkin/kong-react-admin "Get your own image badge on microbadger.com")

```bash
# Start Kong Dashboard
docker run --rm -p 8080:8080 -e REACT_APP_API_URL="http://kong:8001" kepkin/kong-react-admin

# Start Kong Dashboard on a custom port
docker run --rm -p [port]:8080 -e REACT_APP_API_URL="http://kong:8001" kepkin/kong-react-admin

```
