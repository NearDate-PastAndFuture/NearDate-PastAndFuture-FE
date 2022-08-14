export function new_json_file(json_data: any, file_name: string) {
    const file = new File([JSON.stringify(json_data)], file_name, { type: 'text/json' });
    return file;
}