# TatisWeb — portfolio

Новый сайт-портфолио Сергея Тарасенко на React и Vite.

## Локальный запуск

```bash
npm ci
npm run dev
```

Сборка: `npm run build`. Результат — `dist/`.

## Публикация

Workflow `.github/workflows/deploy.yml` собирает сайт и разворачивает его на GitHub Pages для этого репозитория после включения **Settings → Pages → Build and deployment → GitHub Actions**. Для репозитория `TatisWeb/App2023` адрес публикации будет `https://tatisweb.github.io/App2023/` после настройки корректного base path, либо потребуется настроить публикацию в репозитории `TatisWeb/tatisweb.github.io` для корневого адреса. При публикации в подпапку установите `VITE_BASE=/App2023/` для сборки и используйте относительные пути для изображений.
