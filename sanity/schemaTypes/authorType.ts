import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "xUrl",
      title: "X（旧Twitter）URL",
      type: "url",
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
  ],
});
