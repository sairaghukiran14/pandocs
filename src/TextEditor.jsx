import React, { useState } from "react";
import Quill from "quill";
import { useCallback, useEffect } from "react";

import "quill/dist/quill.snow.css";

import { useParams } from "react-router";
// import Socket.io-client

import { io } from "socket.io-client";

// Adding time for every 2 seconds document should be saved
const SAVE_INTERVAL_MS = 2000;
// Adding more options in toolbar

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const { id: documentId } = useParams();
  // To Access socket anywhere use useState

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // This Below code is for the Connection Check

  useEffect(() => {
    const s = io("https://pandocs-server.onrender.com/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  // 2nd UseEffect

  useEffect(() => {
    if (socket == null || quill == null) return;

    // You should only load Document Once so we use
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);
  // Saving the document

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      //Updating contents of quill
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", handler);
    return () => {
      // After the use we should off the socket as useEffect ends
      socket.off("recieve-changes", handler);
    };
  }, [socket, quill]);

  // This useEffect is for Textchanges made by the User and Emit them to other users
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      // If source is not user nothing returns
      if (source !== "user") return;

      // We should emit the delta to the server
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      // After the use we should off the quill as useEffect ends
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.appendChild(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return (
    <>
      <div className="topofcontainer">
        <button
          className="btn"
          onClick={() => {
            navigator.clipboard.writeText(window.location.pathname);
          }}
        >
          {window.location.pathname.slice(11)}
        </button>
      </div>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
