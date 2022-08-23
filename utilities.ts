export function truncateAddress(address: string | null) {
	return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
}
