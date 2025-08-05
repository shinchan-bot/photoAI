"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios";
import JSZip from 'jszip';
import {BACKEND_URL} from "../../app/config";

export function UploadModel() {

  const [files, setFiles] = useState([])
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Uploading file:", files)
    const zip = new JSZip();
    const res = await axios.get(`${BACKEND_URL}/pre-signed-url`)
    console.log(res)
    const presignedUrl = res.data.presignedUrl;
    const url = res.data.url;
    console.log(url)
    console.log(files) 
    // for(const file of files.files)
    //   const content = await files.arrayBuffer();
    //   zip.file(files.name, content);
    // }
    // const content = await zip.generateAsync({type: "blob"});
    // const formData = new FormData();
    // formData.append("file",content);
    // formData.append("key", url);
    // const result = await axios. post(presignedUrl, formData);
    // console.log(result.data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
        <CardDescription>Select files to upload and click the submit button.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-10 h-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" multiple type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          {files && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{files.name}</p>
                <p className="text-sm text-muted-foreground">{(files.size / 1024).toFixed(2)} KB</p>
              </div>
              <Button type="submit">Upload</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}