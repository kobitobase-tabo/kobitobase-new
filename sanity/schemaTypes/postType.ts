import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: '著者',
      type: 'reference',
      to: { type: 'author' },
    }),

    // ✅ 正しい category（reference 型）
    defineField({
      name: 'category',
      title: 'カテゴリー',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
    }),

    defineField({
      name: 'body',
      title: '本文',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      category: 'category.title', // ← category のタイトルを取得
    },
    prepare({ title, author, media, category }) {
      return {
        title,
        media,
        subtitle: `${author ? `by ${author}` : ''} ${category ? `| ${category}` : ''}`,
      }
    },
  },
})
