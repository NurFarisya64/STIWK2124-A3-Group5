# --- Stage 1: Build the Angular app ---
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# Stage 2: Jalankan aplikasi menggunakan Nginx
FROM nginx:alpine

# 1. Salin konfigurasi proxy yang kita betulkan tadi ke dalam Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2. Salin hasil build Angular ke folder web root Nginx
# ⚠️ PASTIKAN PATH INI BETUL: Cuba check folder /dist/ di komputer anda, apa nama sub-foldernya?
COPY --from=build /app/dist/arl-frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]