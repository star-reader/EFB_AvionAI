import { useEffect, useState } from "react"
import { Button, Select, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import type { SelectProps } from 'antd';
import pubsub from 'pubsub-js'
import axios from 'axios'
import apiUrl from "../../config/api/apiUrl";
import createHeader from "../../utils/createHeader";
import useWaypointLayer from "../../hooks/user/useWaypointLayer";

interface Props {
    location: number[]
}

export default ({location}: Props) => {

    const [show, setShow] = useState(false)

    const onFinish = (value: CustomWaypointForm) => {
        axios.post(apiUrl.uploadWaypoint, {...value, 'location': location}, {'headers': createHeader()}).then(() => {
            useWaypointLayer()
            setShow(false)
        }).catch(() => {
            setShow(false)
        })
    }

    const props: UploadProps = {
        name: 'file',
        action: `${apiUrl.uploadFile}/test`,
        headers: {
            // @ts-ignore
          authorization: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
          }
          if (info.file.status === 'done') {
            //message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            //message.error(`${info.file.name} file upload failed.`);
          }
        },
      }

    const options: SelectProps['options'] = [
        {"label":"检查单", "value":"checklist"},
        {"label":"航图", "value":"charts"},
        {"label":"文档", "value":"doc"},
        {"label": "其他", "value": "other"}
    ]

    useEffect(() => {
        pubsub.subscribe('show-file-upload-panel',() => {
            setShow(true)
        })
    })

    return (
        <>
        {
            show &&
            <div className="fixed w-full h-full flex left-0 top-0 justify-center items-center z-[40] select-none create-flight">
                <div className="absolute w-[300px] h-[280px] rounded-md bg-[#2f4565] phone:top-[80px]">
                    <div className="relative m-2"></div>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
            </div>
        }
        </>
    )
}