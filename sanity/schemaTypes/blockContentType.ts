import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, PlayIcon} from '@sanity/icons'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    // -------------------------
    // 通常テキスト Block
    // -------------------------
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [{name: 'href', type: 'url', title: 'URL'}],
          },
        ],
      },
    }),

    // -------------------------
    // ★ YouTube 埋め込み Block
    // -------------------------
    defineArrayMember({
      name: 'youtube',
      type: 'object',
      title: 'YouTube Embed',
      icon: PlayIcon,
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'YouTube URL',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // -------------------------
    // ★ X（Twitter） 埋め込み Block
    // -------------------------
    defineArrayMember({
      name: 'twitter',
      type: 'object',
      title: 'Twitter Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Tweet URL',
          description: 'Tweet の URL を貼ってください',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // -------------------------
    // 画像 Block
    // -------------------------
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alternative Text'}],
    }),
  ],
})
