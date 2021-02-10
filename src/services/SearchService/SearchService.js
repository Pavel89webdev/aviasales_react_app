class SearchService {
	constructor() {
		this.apiBase = "https://front-test.beta.aviasales.ru";
		this.searchId = null;
	}

	async getResoure(queryString) {
		const url = `${this.apiBase}${queryString}`;
		try {
			const response = await fetch(url);
			const result = await response.json();
			return result;
		} catch (e) {
			console.log("some was going wrong, error:", e);
			throw new Error(e.message);
		}
	}

	async getSearchId() {
		const result = await this.getResoure("/search");
		this.searchId = result.searchId;
	}

	async getSearchResult() {
		if (this.searchId) {
			const url = `/tickets?searchId=${this.searchId}`;
			const result = await this.getResoure(url);
			console.log(result);
			return result;
		}

		if (!this.searchId) {
			await this.getSearchId();
			return this.getSearchResult();
		}
	}
}

export default new SearchService();
