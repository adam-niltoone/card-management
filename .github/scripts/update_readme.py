import requests
import os

GITHUB_TOKEN = os.environ['GITHUB_TOKEN']
REPO = os.environ['GITHUB_REPOSITORY']

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

response = requests.get(f"https://api.github.com/repos/{REPO}/issues", headers=headers)
issues = response.json()

unresolved_issues = [issue for issue in issues if not issue.get('pull_request') and issue['state'] == 'open']

with open("README.md", "r") as f:
    content = f.readlines()

# Find the place to add issues in the README.md
start_index = content.index("## Highlighted Issues for the Week/Month\n") + 1
end_index = start_index

while end_index < len(content) and not content[end_index].startswith("## "):
    end_index += 1

# Replace the old list of issues with the new list
content = content[:start_index] + [f"- [{issue['title']}]({issue['html_url']})\n" for issue in unresolved_issues] + content[end_index:]

with open("README.md", "w") as f:
    f.writelines(content)
