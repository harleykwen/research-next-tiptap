import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TiptapEditor, { type TiptapEditorRef } from '@/components/TiptapEditor'
import { getPost, savePost } from '@/services/post'
import { useSearchParams } from 'next/navigation'

interface PostForm {
  title: string
  content: string
}

export default function EditForm() {
  const editorRef = useRef<TiptapEditorRef>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { control, reset, watch } = useForm<PostForm>()

  const searchParams = useSearchParams()
  const templateId = searchParams.get('template_id')

  const getWordCount = useCallback(
    () => editorRef.current?.getInstance()?.storage.characterCount.words() ?? 0,
    [editorRef.current]
  )

  useEffect(() => {
    // getPost().then((post) => {
    //   reset({ ...post })
    //   setIsLoading(false)
    // })
    const params = new URLSearchParams({ template_id: templateId ?? '1' })
    fetch(
      `https://api-oos.jojonomic.com/19983/templify/get?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        reset({
          title: '',
          content: data?.data?.content,
        })
        setIsLoading(false)
      })
  }, [])

  // useEffect(() => {
  //   const subscription = watch((values, { type }) => {
  //     if (type === 'change') {
  //       savePost({ ...values, wordCount: getWordCount() })
  //     }
  //   })

  //   return () => subscription.unsubscribe()
  // }, [watch])

  if (isLoading) return

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="inline-block font-medium dark:text-white mb-2">
          Title
        </label>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full px-4 py-2.5 shadow border border-[#d1d9e0] rounded-md bg-white dark:bg-[#0d1017] dark:text-white dark:border-[#3d444d] outline-none"
              placeholder="Enter post title..."
            />
          )}
        />
      </div>

      <div>
        <label className="inline-block font-medium dark:text-white mb-2">
          Content
        </label>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TiptapEditor
              ref={editorRef}
              ssr={true}
              output="html"
              placeholder={{
                paragraph: 'Type your content here...',
                imageCaption: 'Type caption for image (optional)',
              }}
              contentMinHeight={256}
              contentMaxHeight={640}
              onContentChange={field.onChange}
              initialContent={field.value}
            />
          )}
        />
      </div>

      <button
        onClick={async () => {
          const editorContent = editorRef.current?.getInstance()?.getHTML() // or .getText() depending on the format you need
          console.log({ editorContent })

          await fetch(
            'https://api-oos.jojonomic.com/19983/templify/update-template',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                template_id: templateId,
                content: editorContent,
              }),
            }
          )
        }}
      >
        Save
      </button>
    </div>
  )
}
