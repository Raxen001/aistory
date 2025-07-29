# Steps to Run

- setup infra by running the bash script

- install uv

- uv install

- cd app

- uv run dataLoader.py

# golden json file(the epub processed data) format

"""
[
{
"chapter_number": 1,
"chapter_name": "Introduction to Artificial Intelligence",
"page_number": 1,
"content": "Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn."
},
{
"chapter_number": 1,
"chapter_name": "Introduction to Artificial Intelligence",
"page_number": 2,
"content": "AI can be classified as narrow AI, focused on a single task, or general AI, capable of performing any intellectual task a human can."
},

{
"chapter_number": 2,
"chapter_name": "Machine Learning Basics",
"page_number": 1,
"content": "Machine learning enables systems to learn and improve from experience without explicit programming."
},
{
"chapter_number": 2,
"chapter_name": "Machine Learning Basics",
"page_number": 2,
"content": "Supervised learning uses labeled data, while unsupervised learning finds hidden patterns in unlabeled data."
},

{
"chapter_number": 3,
"chapter_name": "Neural Networks",
"page_number": 1,
"content": "Neural networks mimic the structure of the human brain and are fundamental to deep learning."
},
{
"chapter_number": 3,
"chapter_name": "Neural Networks",
"page_number": 2,
"content": "They consist of layers — input, hidden, and output — where each node represents a neuron."
},

{
"chapter_number": 4,
"chapter_name": "Natural Language Processing",
"page_number": 1,
"content": "NLP enables computers to understand, interpret, and generate human language."
},
{
"chapter_number": 4,
"chapter_name": "Natural Language Processing",
"page_number": 2,
"content": "Key NLP applications include text classification, machine translation, and conversational agents like chatbots."
},

{
"chapter_number": 5,
"chapter_name": "Ethics in AI",
"page_number": 1,
"content": "Ethical concerns in AI include bias in algorithms, user privacy, and job displacement."
},
{
"chapter_number": 5,
"chapter_name": "Ethics in AI",
"page_number": 2,
"content": "Ensuring ethical AI requires transparency, fairness, and accountability in development and deployment."
}
]

"""
