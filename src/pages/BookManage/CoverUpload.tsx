import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";
import { getCover } from './util.ts'

interface CoverUploadProps {
    value?: string;
    onChange?: (value: string) => void
}

let onChange: (value: string) => void;

const props: DraggerProps = {
    name: 'file',
    action: 'http://127.0.0.1:3001/book/uoloadFile',
    method: 'post',
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            onChange(info.file.response);
            message.success(`${info.file.name} 文件上传成功`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
};

const dragger = <Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
</Dragger>

export default function CoverUpload(props: CoverUploadProps) {

    onChange = props.onChange!;

    return props?.value ? <div>
        <img src={getCover(props.value)} alt="封面" width="100" height="100" />
        {dragger}
    </div> : <div>
        {dragger}
    </div>
}
