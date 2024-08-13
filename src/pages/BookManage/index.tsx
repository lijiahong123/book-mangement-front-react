import React from 'react';
import { LOGIN_TYPE, useLoginStatue } from '../../store'
import { Navigate } from "react-router-dom";
import { Button, Card, Form, Input, message, Popconfirm, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { deleteBookItem, searchBooksApi } from '../../interfaces';
import { useEffect, useState } from 'react';
import { AddEditModel } from './addEditModel';
import { getCover } from './util.ts'
import './index.scss'


export type BookType = {
    id: number
    name: string;
    author: string;
    description: string;
    cover: string;
}

export type SearchBookType = {
    name: string;
}



export const BookManage: React.FC = () => {
    const [isLogin] = useLoginStatue()
    const [list, setList] = useState<BookType[]>([])
    const [showModel, setIsModalOpen] = useState(false);
    const [boodId, setBookId] = useState<null | number>(null)
    const [dialogStatus, setDialogStatus] = useState<boolean>(false)


    useEffect(() => {
        isLogin && onSearch();
    }, []);

    if (!isLogin) return <Navigate to="/login" replace={true} />


    const logout = () => {
        sessionStorage.removeItem(LOGIN_TYPE)
        return window.location.href = '/'
    }

    const onSearch = async (val?: SearchBookType) => {
        try {
            const data = await searchBooksApi(val)
            setList(data)
        } catch (error) {
            setList([])
        }
    }

    const handleClose = (isSearch: boolean) => {
        setIsModalOpen(false)
        isSearch && onSearch()
    }



    const createBook = () => {
        setBookId(null)
        setDialogStatus(false)
        setIsModalOpen(true)
    }

    const updateBookItem = (id: number) => {
        setBookId(id)
        setDialogStatus(false)
        setIsModalOpen(true)
    }

    const bookItemDetail = (id: number) => {
        setBookId(id)
        setDialogStatus(true)
        setIsModalOpen(true)
    }


    const deleteBook = async (id: number) => {
        console.log(id);
        await deleteBookItem(id)
        message.success('已删除')
        await onSearch()

    };

    const searchComp = (
        <Form layout="inline" onFinish={onSearch}>
            <Form.Item name="name">
                <Input placeholder='书名' allowClear />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'>搜索</Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" onClick={createBook}>新增</Button>
            </Form.Item>
        </Form>
    )
    const bookList = list.map(item => (
        <Card
            key={item.id}
            cover={<img className="book-cover" src={getCover(item.cover)} alt="" />}
            hoverable={true}
            style={{ width: 300, margin: '20px', marginBottom: 0 }}>
            <h2 className='book-title'>{item.name}</h2>
            <div className='book-author'>{item.author}</div>
            <div className="book-btn">
                <Button type="link" onClick={() => bookItemDetail(item.id)}>详情</Button>
                <Button type="link" onClick={() => updateBookItem(item.id)}>编辑</Button>
                <Popconfirm
                    title="确认删除"
                    description="确认删除书数据吗?"
                    onConfirm={() => deleteBook(item.id)}
                    onCancel={() => message.info('已取消删除')}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button type="link">删除</Button>
                </Popconfirm>
            </div>
        </Card>
    ))





    return (
        <>
            <div className='book-mangement'>
                <h1 className='header'>
                    <span>图书管理系统</span>
                    <Tooltip title="退出">
                        <UserOutlined onClick={logout} />
                    </Tooltip>
                </h1>
                <div className="content">
                    {/* 搜索 */}
                    <div className="search-header">{searchComp}</div>
                    {/* 列表 */}
                    <div className="book-list">{bookList}</div>
                </div>
            </div >
            {/* 新增编辑 */}
            <AddEditModel
                showModel={showModel}
                id={boodId}
                handleClose={handleClose}
                detail={dialogStatus}
            />
        </>
    )
}