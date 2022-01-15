export class Repository {
  constructor(
    public name: String,
    public stargazers_count: Number,
    public forks: Number,
    public description: String,
    public url: String,
    public topic: [],
    public language?: String
  ) {}
}
