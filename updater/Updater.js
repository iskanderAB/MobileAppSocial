export default function (oldObject, updatedObject) {
    return {
        ...oldObject ,
        ...updatedObject
    }
}