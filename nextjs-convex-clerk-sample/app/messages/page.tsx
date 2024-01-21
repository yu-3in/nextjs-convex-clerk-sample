"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

const Messages = () => {
  const messages = useQuery(api.messages.getAll);
  const create = useMutation(api.messages.create);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await create({ title, content });

    setTitle("");
    setContent("");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-4">
      <h1 className="text-2xl font-bold mb-4">メッセージ一覧</h1>
      <ul className="list-none gap-y-4 flex flex-col">
        {messages?.map((message, index) => (
          <li
            key={message._id}
            className="flex gap-2 flex-col border border-gray-300 px-4 py-2 rounded-lg"
          >
            <div className="font-bold">{message.title}</div>
            <div className="ml-4">{message.content}</div>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border-t border-gray-300 mt-8 pt-12"
      >
        <h2 className="text-xl font-bold text-center mb-8">
          メッセージを作成する
        </h2>
        <div className="flex items-center justify-center flex-col -mx-3 mb-6 gap-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              タイトル
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="content"
            >
              内容
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="content"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            作成する
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
