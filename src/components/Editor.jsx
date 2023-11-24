import React, { useState } from "react";
import Quill from "quill";
import { useCallback, useEffect } from "react";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
const SAVE_INTERVAL_MS = 2000;
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

const Editor = () => {
  const { id: documentId } = useParams();
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const s = io.connect("https://pandocs-server.onrender.com");
    setSocket(s);
    s.on("receiveMessage", (data) => {
      console.log(data);
    });
    s.emit("sendMessage", { message: "Message from client" });
    return () => {
      s.disconnect();
    };
  }, []);
  console.log(socket);
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
// useEffect(()=>{
// socket.emit("sendUserinfo",{id:userInfo._id})
// },[userInfo])
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
      // socket.emit("send-Userinfo", { _id: userInfo._id });
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

  return <div className="container" ref={wrapperRef}></div>;
};

export default Editor;
