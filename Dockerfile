# Use lightweight nginx image to serve static files
FROM nginx:alpine

# Copy all static files to nginx
COPY . /usr/share/nginx/html/

# Copy custom nginx config (optional, for SPA routing)
RUN echo 'server { \
    listen 8080; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ @fallback; \
    } \
    \
    location @fallback { \
        rewrite ^.*$ /index.html break; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
