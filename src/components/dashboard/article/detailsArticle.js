import toast from "react-hot-toast";
import axios from "axios";
import { router } from "next/client";
import Head from "next/head";
import {
  Button,
  Checkbox,
  Grid,
  Input,
  Loading,
  Modal,
  Radio,
  Text,
  useModal,
} from "@nextui-org/react";
import Image from "next/image";
import { ToggleTheme } from "@/components/ToggleTheme";
import useSWR from "swr";
import { useState } from "react";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/utils/TextEditor"), {
  ssr: false,
  loading: () => <Loading />,
});
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function DetailsArticle({ article, metaTitle }) {
  const { data: tagsData, isLoading: isLoadingTags } = useSWR("/tags", fetcher);
  const { setVisible, bindings } = useModal();
  const [content, setContent] = useState(article.content || "");
  const [title, setTitle] = useState(article.title || "");
  const [description, setDescription] = useState(article.description || "");
  const [tags, setTags] = useState(article.tags || []);
  const [image, setImage] = useState({
    preview: article.image || "",
    data: "",
  });
  const [status, setStatus] = useState(article.status || "draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image.data) {
      toast.error("Image is required");
    } else if (!title) {
      toast.error("Title is required");
    } else if (!description) {
      toast.error("Description is required");
    } else if (!content) {
      toast.error("Content is required");
    } else {
      let formData = new FormData();
      if (image.data.size > 2000000) {
        return toast.error("Image size should be less than 2MB");
      }
      formData.append("image", image.data);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("status", status);
      if (tags.length > 0) {
        formData.append("tags", tags);
      }
      axios.post("/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("content");
      toast.success("Article Created");
      router.push("/wsq/dashboard/articles");
    }
  };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <Text h2>{metaTitle}</Text>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 mb-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex-col gap-4">
                <label className="block">
                  <Text size="$xl" color="gray">
                    Title (max 70 characters)
                  </Text>
                  <input
                    type="text"
                    value={localStorage.getItem("title") || title}
                    maxLength="70"
                    required
                    onChange={(e) => {
                      localStorage.setItem("title", e.target.value);
                      setTitle(e.target.value);
                    }}
                    className="w-full md:w-1/2 px-4 py-2 my-2 text-gray-700 dark:text-white bg-transparent border border-gray-200 rounded-md focus:border-orange-500 focus:outline-none"
                    placeholder="Title"
                  />
                </label>
                <label className="block">
                  <Text size="$xl" color="gray">
                    Description (max 100 characters)
                  </Text>
                  <textarea
                    value={localStorage.getItem("description") || description}
                    onChange={(e) => {
                      localStorage.setItem("description", e.target.value);
                      setDescription(e.target.value);
                    }}
                    className="w-full md:w-1/2 px-4 py-2 mt-2 text-gray-700 dark:text-white bg-transparent border border-gray-200 rounded-md focus:border-orange-500 focus:outline-none resize-none"
                    required
                    placeholder="Description"
                    maxLength="100"
                  />
                </label>
                <Checkbox.Group
                  label="Select Tags"
                  css={{ margin: "1rem 0" }}
                  onChange={(value) => setTags(value)}
                  orientation="horizontal"
                  color="warning"
                  isRequired
                  defaultValue={tags}
                >
                  <Grid.Container gap={2}>
                    {isLoadingTags ? (
                      <Loading />
                    ) : (
                      tagsData?.map((tag) => (
                        <Grid xs={12} sm={6} md={4} lg={3} key={tag._id}>
                          <Checkbox
                            value={tag._id}
                            onClick={() => {
                              localStorage.setItem("tags", [tag._id]);
                              setTags(tag._id);
                            }}
                          >
                            {" "}
                            {tag.name}{" "}
                          </Checkbox>
                        </Grid>
                      ))
                    )}
                  </Grid.Container>
                </Checkbox.Group>
                <Radio.Group
                  orientation="horizontal"
                  label="Status"
                  defaultValue="draft"
                  onChange={(e) => setStatus(e)}
                >
                  <Radio value="published" color="success">
                    Publish
                  </Radio>
                  <Radio value="draft" color="warning">
                    Draft
                  </Radio>
                </Radio.Group>
              </div>
              <div className="flex-2 flex flex-col gap-2 items-center">
                <Input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div
                  className="dark:bg-[#16181A] border-2 border-orange-500 rounded-md max-h-2xl shadow-lg w-[350px]"
                  style={{ overflowWrap: "break-word" }}
                >
                  <Image
                    src={
                      image.preview
                        ? image.preview
                        : "https://placehold.co/400x200/png?text=Clik+to+upload+image+(Maxsize+2MB)"
                    }
                    onClick={() => {
                      const fileInput = document.getElementById("fileInput");
                      fileInput.click();
                    }}
                    className="cursor-pointer max-h-52 object-cover rounded-t-md border-b-2 border-orange-500 hover:opacity-80"
                    alt="preview"
                    width={400}
                    height={200}
                  />
                  <div className="p-4">
                    <Text b>{localStorage.getItem("title") || title}</Text>
                    <Text className="border-t-2 border-gray-900 pt-4">
                      {localStorage.getItem("description") || description}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-2 flex flex-row gap-2">
              <Button
                auto
                color="warning"
                flat
                onPress={() => setVisible(true)}
              >
                Write Article
              </Button>
              <Button type="submit" color="primary" auto>
                Submit
              </Button>
            </div>
            <Modal
              scroll
              fullScreen
              closeButton
              aria-labelledby="write article"
              aria-describedby="write article"
              css={{ cursor: "default" }}
              {...bindings}
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  Share your thoughts!
                </Text>
              </Modal.Header>
              <Modal.Body>
                <TextEditor content={content} setContent={setContent} />
              </Modal.Body>
              <Modal.Footer>
                <ToggleTheme />
                <Button
                  flat
                  auto
                  color="error"
                  onPress={() => setVisible(false)}
                >
                  Close
                </Button>
                <Button onPress={() => setVisible(false)}>Done</Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </div>
  );
}
