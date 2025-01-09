//API URL and Headers exported for DataCard.tsx
export const requestOptions = {
    options: {method: "GET", headers: {'X-GitHub-Api-Version': '2022-11-28'}},
};
export const url = {
    stargazers_count: process.env.STARGAZERS_COUNT,
    contributors: process.env.CONTRIBUTORS,
};