import {ref} from "vue";

const listDefault = ref([
    {
        name: '单选题',
        id: 1,
        type: 'radio',
        value: '',
        options: [
            {id: 'A', name: '选项A'},
            {id: 'B', name: '选项B'}
        ]
    }
])
export const titleNew = ref('一份问卷')
export const listNew = ref(
    listDefault.value.map(item => ({
        name: `${item.name}-1`,
        id: item.id,
        type: `${item.type}`,
        // 结果值
        value: `${item.value}`,//item.value as any,
        // 逐个赋值options，保持为数组形式
        options: item.options.map(option => ({
            id: `${option.id}`,
            name: `${option.name}`
        }))
    }))
)

interface Option {
    id: number;
    name: string;
}

export default function clone(element: { name: string; id: number; type: string; value: string; options: Option[]}) {
    const len = listNew.value.length+1
    console.log("=================Add element=================")

    if (element.type === 'radio'){
        return {
            name: `${element.name}-clone-${len}`,
            id: len,
            type: `${element.type}`,
            options: element.options.map((option: { id: number; name: string; }) => ({
                id: `${option.id}`,
                name: `${option.name}`
            }))
        }
    }else if (element.type === 'checkbox'){
        return {
            name: `${element.name}-clone-${len}`,
            id: len,
            type: `${element.type}`,
            value: element.value,
            options: element.options.map((option: { id: number; name: string; }) => ({
                id: `${option.id}`,
                name: `${option.name}`
            }))
        }
    } else if (element.type === 'input'){
        return {
            name: `${element.name}-clone-${len}`,
            id: len,
            type: `${element.type}`,
            value: `${element.value}`
        }
    }
}
