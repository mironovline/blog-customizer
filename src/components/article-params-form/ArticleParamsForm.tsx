import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useEffect, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	onFormChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};
type FormField = keyof ArticleStateType;

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { formState, onFormChange, onApply, onReset } = props;

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMenuOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleOptionChange = (field: FormField) => (option: OptionType) => {
		onFormChange({
			...formState,
			[field]: option,
		});
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleFormReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionChange('fontFamilyOption')}
						placeholder='Выберите шрифт'
					/>

					<Separator />

					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						name='fontSize'
						options={fontSizeOptions}
						onChange={handleOptionChange('fontSizeOption')}
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleOptionChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
					/>

					<Separator />

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleOptionChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
