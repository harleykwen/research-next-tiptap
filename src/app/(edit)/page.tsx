'use client'

import { Suspense } from 'react'
import EditForm from './_components/EditForm'

import './style.scss'

export default function EditPage() {
  return (
    <Suspense>
      <div className="max-w-[56rem] w-full mx-auto py-10 px-6">
        <EditForm />
      </div>
    </Suspense>
  )
}
