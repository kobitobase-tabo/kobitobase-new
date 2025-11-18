'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// API の設定
import { apiVersion, dataset, projectId } from './sanity/env'

// スキーマ（Posts / Authors / Categories）
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(), // ← ★これが CMS（Posts, Categories など）を表示する！
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
