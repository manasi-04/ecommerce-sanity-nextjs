import {defineConfig} from 'sanity/lib/exports'
import {deskTool} from 'sanity/lib/exports/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ecommerce-music',

  projectId: '88a3qcys',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
