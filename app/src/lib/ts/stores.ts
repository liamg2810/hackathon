import { get, writable } from 'svelte/store';

type PersonalityAnswer = {
    word: string;
    answer: string;
};

type DiagnosticAnswer = {
    question: string;
    answer: string;
};

function createPersistedStore<T>(key: string, initialValue: T) {
    let data = initialValue;

    if (typeof window !== 'undefined' && window.localStorage) {
        const storedValue = localStorage.getItem(key);
        data = storedValue ? JSON.parse(storedValue) : initialValue;
    }

    const store = writable<T>(data);

    store.subscribe((value) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
}

export const personalityAnswers = createPersistedStore<PersonalityAnswer[]>('personalityAnswers', []);
export const diagnosticAnswers = createPersistedStore<DiagnosticAnswer[]>('diagnosticAnswers', []);

export const formattedPersonalityAnswers = writable<string>('');
export const formattedDiagnosticAnswers = writable<string>('');

personalityAnswers.subscribe((answers) => {
    formattedPersonalityAnswers.set(
        answers.map(answer => `question: ${answer.word}, answer: ${answer.answer}`).join('\n')
    );
    console.log(get(formattedPersonalityAnswers));
});

diagnosticAnswers.subscribe((answers) => {
    formattedDiagnosticAnswers.set(
        answers.map(answer => `question: ${answer.question} answer: ${answer.answer}`).join('\n')
    );
});

export async function ResetAnswers() {
    personalityAnswers.set([]);
    diagnosticAnswers.set([]);
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('personalityAnswers');
        localStorage.removeItem('diagnosticAnswers');
    }
}