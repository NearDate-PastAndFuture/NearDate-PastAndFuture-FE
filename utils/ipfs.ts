import { Web3Storage } from 'web3.storage';

const token: string = process.env.NEXT_PUBLIC_STORAGE_WEB3 || "";
const client = new Web3Storage({ token: token, endpoint: new URL('https://api.web3.storage') });

export function get_ipfs_link(subDomain: string, filename: string) {
    return `https://${subDomain}.ipfs.dweb.link/${filename}`;
}

const subDomainNearDateStorage: string = process.env.NEXT_PUBLIC_STORAGE_WEB3_NEARDATE || "";

export function get_ipfs_link_image(neardate_id: string) {
    return `https://${subDomainNearDateStorage}.ipfs.dweb.link/img/${neardate_id}.png`;
}

export default client;
