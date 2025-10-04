import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// состояние статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// состояние формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// обработчик изменений в форме
	const handleFormChange = (newState: ArticleStateType) => {
		setFormState(newState);
	};

	// обработчик применения стилей
	const handleApply = () => {
		setArticleState(formState);
	};

	// обработчик сброса состояния и статьи, и формы
	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				onFormChange={handleFormChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
