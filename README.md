# kong-react-admin
This is dashboard for Kong api gateway.

### Using Docker

[![](https://images.microbadger.com/badges/image/kepkin/kong-react-admin.svg)](https://microbadger.com/images/kepkin/kong-react-admin "Get your own image badge on microbadger.com")

```bash
# Start Kong Dashboard
docker run --rm -p 8080:8080 -e REACT_APP_API_URL="http://kong:8001" kepkin/kong-react-admin

# Start Kong Dashboard on a custom port
docker run --rm -p [port]:8080 -e REACT_APP_API_URL="http://kong:8001" kepkin/kong-react-admin

```
