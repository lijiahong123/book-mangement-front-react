import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message } from 'antd'
import { BookType } from './index'
import { createBook, findBook, updateBook } from '../../interfaces/index'
import CoverUpload from "./CoverUpload";

export type CreateBookType = Omit<BookType, 'id'>

type AddBookPropsType = {
    showModel: boolean;
    handleClose: (isSearch: boolean) => void;
    id: number | null,
    detail: boolean
}

enum ModelType {
    "ADD" = '创建图书',
    "UPDATE" = '编辑图书',
    "DETAIL" = "查看详情"
}


export const AddEditModel: React.FC<AddBookPropsType> = (props) => {
    const [form] = Form.useForm<CreateBookType>();
    const [modelType, setModelType] = useState<ModelType>(ModelType.ADD)

    const setBookDetail = async (id: number) => {
        const res = await findBook(id);
        form.setFieldValue('name', res.name)
        form.setFieldValue('author', res.author)
        form.setFieldValue('description', res.description)
        form.setFieldValue('cover', res.cover)
    }

    useEffect(() => {
        if (props.id != null && props.showModel) {
            setModelType(props.detail ? ModelType.DETAIL : ModelType.UPDATE)
            setBookDetail(props.id)
        }
    }, [props.showModel])


    const handleCancel = (isSearch: boolean) => {
        form.resetFields();
        props.handleClose(isSearch)
    };

    // 新增
    const addHandler = async () => {
        await form.validateFields();
        const values = form.getFieldsValue();

        if (modelType === ModelType.ADD) {
            await createBook(values)
            message.success('创建成功')
            handleCancel(true)
        } else if (modelType === ModelType.UPDATE) {
            await updateBook({ ...values, id: props.id as number })
            message.success('更新成功')
            handleCancel(true)
        } else {
            handleCancel(false)
        }
    }
    return (
        <Modal title={modelType} okText="提交" okButtonProps={{ disabled: props.detail }} cancelText="取消" open={props.showModel} onOk={addHandler} onCancel={() => handleCancel(false)}>
            <Form disabled={props.detail} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Form.Item name="name" label="书名"
                    rules={[
                        { required: true, message: "书名必填" }
                    ]}
                >
                    <Input placeholder='请输入' allowClear />
                </Form.Item>
                <Form.Item name="author" label="作者"
                    rules={[
                        { required: true, message: "作者必填" }
                    ]}
                >
                    <Input placeholder='请输入' allowClear />
                </Form.Item>
                <Form.Item name="description" label="描述"
                    rules={[
                        { required: true, message: "描述必填" }
                    ]}
                >
                    <Input.TextArea rows={3} placeholder='请输入' allowClear />
                </Form.Item>

                <Form.Item name="cover" label="封面"
                    rules={[
                        { required: true, message: "封面必填" }
                    ]}
                >
                    <CoverUpload></CoverUpload>
                </Form.Item>
            </Form>
        </Modal>
    )
}