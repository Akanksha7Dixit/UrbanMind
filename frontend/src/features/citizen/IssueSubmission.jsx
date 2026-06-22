import { useState } from "react";
import { createIssue } from "../../services/issueService";

export default function IssueSubmission() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Infrastructure");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const token = JSON.parse(
        localStorage.getItem(
          "urbanmind-auth"
        )
      )?.state?.token;

      await createIssue(
        {
          title,
          description,
          category,
        },
        token
      );

      alert(
        "Issue Submitted Successfully"
      );

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold">
        Report Issue
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        >
          <option>
            Infrastructure
          </option>

          <option>
            Sanitation
          </option>

          <option>
            Transport
          </option>

          <option>
            Water
          </option>
        </select>

        <button
          type="submit"
          className="rounded bg-cyan-600 px-6 py-3"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
}