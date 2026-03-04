"use client";
import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingersApi } from "../../../tools/api";
import StyledAutoComplete from "@/components/AutoComplete";
import { Form } from "antd"; // Added Form import

const SongRegisterPage = () => {
  const [form] = Form.useForm(); // Added form hook

  const [singerNameInput, setSingerNameInput] = useState("");
  const [selectedSinger, setSelectedSinger] = useState(null);

  const {
    data: allSingersData,
    isLoading: singersLoading,
    error: singersError,
  } = useQuery({
    queryKey: ["singers"],
    queryFn: getSingersApi,
  });

  const allSingers = allSingersData?.data?.items || [];
  console.log("Singers from getSingersApi:", allSingers);

  const filteredSingers = allSingers.filter((singer) =>
    singer.name.toLowerCase().includes(singerNameInput.toLowerCase()),
  );

  const handleSingerNameInputChange = useCallback((name) => {
    setSingerNameInput(name);
  }, []);

  const handleFinish = useCallback((values) => {
    const selectedSingerObject = allSingers.find(s => s.name === values.singerId);
    console.log("Form submitted with singer ID:", selectedSingerObject?.id, "and name:", values.singerId);
    // You would then use selectedSingerObject.id for actual submission
  }, [allSingers]);

  return (
    <div className="common-form">
      <div className="common-form-title">
        <h1>가수 검색</h1>
      </div>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        {" "}
        {/* Added Form wrapper */}
        <div>
          <Form.Item // Added Form.Item
            label={<div className="common-form-label">가수</div>}
            name="singerId"
            rules={[{ required: true, message: "가수는 필수 입력입니다." }]}
          >
            <StyledAutoComplete
              value={singerNameInput}
              onSearch={handleSingerNameInputChange}
              // onChange={setSingerNameInput} // Removed onChange to prevent ID from showing in input
              placeholder="가수 이름 입력"
              options={filteredSingers.map((singer) => ({
                value: singer.name, // Display name in input
                label: singer.name,
                originalId: singer.id, // Store original ID
              }))}
              onSelect={(selectedValue, option) => {
                const selectedId = option.originalId; // Get original ID
                const selected = allSingers.find((s) => s.id === selectedId);
                if (selected) {
                  setSelectedSinger(selected);
                  setSingerNameInput(selected.name);
                  form.setFieldsValue({ singerId: selected.name }); // Store name in form field
                }
              }}
              loading={singersLoading}
              block // StyledAutoComplete is already 100% width with this prop
            />
          </Form.Item>
        </div>
                {/* Removed selectedSinger display as per user request */}
              </Form>
            </div>
          );
};

export default SongRegisterPage;
