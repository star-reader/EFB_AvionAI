import { useEffect, useState } from "react"
import { Button, Select, Form, Input } from 'antd';
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

    const options: SelectProps['options'] = [
        {"label":"Waypoint", "value":"waypoint"},
        {"label":"Airport", "value":"airport"},
        {"label":"VOR", "value":"vor"},
        {"label":"NDB", "value":"ndb"},
        {"label": "Other", "value": "other"}
    ]

    useEffect(() => {
        pubsub.subscribe('show-custom-waypoint-panel',() => {
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
                    <Form
                        name="new-waypoint"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 260 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<CustomWaypointForm>
                        label="Identifier"
                        name="ident"
                        rules={[{ required: true, message: 'Please enter waypoint identifier' }]}
                        >
                        <Input placeholder="e.g., DXG" />
                        </Form.Item>
                        <Form.Item<CustomWaypointForm>
                        label="Name"
                        name="name"
                        >
                        <Input placeholder="e.g., Daxing" />
                        </Form.Item>
                        <Form.Item<CustomWaypointForm>
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select type' }]}
                        >
                        <Select
                        placeholder="Select waypoint type"
                        optionFilterProp="children"
                        options={options}
                        />
                        </Form.Item>
                        <Form.Item<CustomWaypointForm>
                        label="Frequency"
                        name="frequency"
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                        wrapperCol={{ span: 16, offset: 8 }}>
                        <Button className="new-flight-submit" type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button className="new-flight-submit cancel" type="primary" htmlType="submit" 
                        style={{backgroundColor: 'orangered'
                        }} onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        }
        </>
    )
}