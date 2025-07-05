
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// === ICONS ===
const WeightliftingIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6h12v12H6z"></path><path d="M12 2v20"></path><path d="M2 12h20"></path>
    </svg>
);
const ChestIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12H3a1 1 0 00-1 1v6a1 1 0 001 1h1a1 1 0 001-1v-6a1 1 0 00-1-1zM21 12h-1a1 1 0 00-1 1v6a1 1 0 001 1h1a1 1 0 001-1v-6a1 1 0 00-1-1zM12 5a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
);
const BackIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 00-9 9h3.5a5.5 5.5 0 1111 0H21a9 9 0 00-9-9z"/><path d="M12 12L9 21h6l-3-9z"/>
    </svg>
);
const LegsIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 21L12 15l5.5 6"/><path d="M12 3v12"/>
        <path d="M5 4.5h14"/>
        <path d="M5 4.5a2.5 2.5 0 01-2.5-2.5A2.5 2.5 0 015 0a2.5 2.5 0 012.5 2.5A2.5 2.5 0 015 4.5z"/>
        <path d="M19 4.5a2.5 2.5 0 01-2.5-2.5A2.5 2.5 0 0119 0a2.5 2.5 0 012.5 2.5A2.5 2.5 0 0119 4.5z"/>
    </svg>
);
const ShouldersIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="4" />
        <path d="M12 10v4" />
        <path d="M12 14s-4 4-8 4" />
        <path d="M12 14s4 4 8 4" />
        <path d="M5 12H3" />
        <path d="M19 12h2" />
    </svg>
);
const ArmsIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 11a5 5 0 10-10 0" />
        <path d="M7 11V6a1 1 0 011-1h1" />
        <path d="M15 6h1a1 1 0 011 1v5" />
        <path d="M12 21a2 2 0 002-2H10a2 2 0 002 2z" />
        <path d="M12 11v8" />
    </svg>
);
const CoreIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5C7.029 5 3 9.029 3 14s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z"/>
        <path d="M12 5V2"/>
        <path d="M12 22v-3"/>
        <path d="M5 14H2"/>
        <path d="M22 14h-3"/>
    </svg>
);
const FullBodyIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v6" />
        <path d="M9 14h6" />
        <path d="M9 17l-2 4" />
        <path d="M15 17l2 4" />
    </svg>
);
const CardioIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-4 9H2"/>
    </svg>
);

const ExerciseIcon = ({ category, style } : { category: string, style: React.CSSProperties }) => {
    const iconContainerStyle = { ...styles.libraryIconContainer, ...style };
    const iconStyle = styles.libraryIcon;

    let IconComponent;
    switch(category) {
        case 'Chest': IconComponent = ChestIcon; break;
        case 'Back': IconComponent = BackIcon; break;
        case 'Legs': IconComponent = LegsIcon; break;
        case 'Shoulders': IconComponent = ShouldersIcon; break;
        case 'Arms': IconComponent = ArmsIcon; break;
        case 'Core': IconComponent = CoreIcon; break;
        case 'Full-Body': IconComponent = FullBodyIcon; break;
        case 'Cardio': IconComponent = CardioIcon; break;
        default: IconComponent = WeightliftingIcon;
    }
    return (
        <div style={iconContainerStyle}>
            <IconComponent style={iconStyle} />
        </div>
    );
};


interface SetData {
    weight: number;
    reps: number;
}

interface Workout {
    id: number;
    timestamp: string;
    name: string;
    type: 'Strength' | 'Cardio';
    date: string;
    sets?: SetData[];
    duration?: number;
    calories: number;
}

interface Exercise {
    name: string;
    type: 'Strength' | 'Cardio';
    category: string;
}

const NEW_EXERCISE_DB: Exercise[] = [
    // Chest
    { name: 'Barbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Dumbbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Incline Barbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Incline Dumbbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Decline Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Cable Chest Fly', type: 'Strength', category: 'Chest' },
    { name: 'Dumbbell Chest Fly', type: 'Strength', category: 'Chest' },
    { name: 'Push-Ups', type: 'Strength', category: 'Chest' },
    { name: 'Pec Deck', type: 'Strength', category: 'Chest' },
    // Back
    { name: 'Wide Grip Pull-Ups', type: 'Strength', category: 'Back' },
    { name: 'Lat Pulldown', type: 'Strength', category: 'Back' },
    { name: 'Bent Over Barbell Row', type: 'Strength', category: 'Back' },
    { name: 'Single-Arm Dumbbell Row', type: 'Strength', category: 'Back' },
    { name: 'Seated Cable Row', type: 'Strength', category: 'Back' },
    { name: 'Standard Deadlifts', type: 'Strength', category: 'Back' },
    // Legs
    { name: 'Barbell Back Squat', type: 'Strength', category: 'Legs' },
    { name: 'Front Squat', type: 'Strength', category: 'Legs' },
    { name: 'Leg Press', type: 'Strength', category: 'Legs' },
    { name: 'Walking Lunges', type: 'Strength', category: 'Legs' },
    { name: 'Leg Extension Machine', type: 'Strength', category: 'Legs' },
    { name: 'Seated Leg Curl Machine', type: 'Strength', category: 'Legs' },
    { name: 'Hip Thrusts', type: 'Strength', category: 'Legs' },
    { name: 'Romanian Deadlifts', type: 'Strength', category: 'Legs' },
    { name: 'Calf Raises', type: 'Strength', category: 'Legs' },
    // Shoulders
    { name: 'Overhead Press (Barbell)', type: 'Strength', category: 'Shoulders' },
    { name: 'Arnold Press', type: 'Strength', category: 'Shoulders' },
    { name: 'Lateral Raises', type: 'Strength', category: 'Shoulders' },
    { name: 'Front Raises', type: 'Strength', category: 'Shoulders' },
    { name: 'Upright Row', type: 'Strength', category: 'Shoulders' },
    { name: 'Face Pulls', type: 'Strength', category: 'Shoulders' },
    // Arms
    { name: 'Barbell Curl', type: 'Strength', category: 'Arms' },
    { name: 'Dumbbell Curl', type: 'Strength', category: 'Arms' },
    { name: 'Preacher Curl', type: 'Strength', category: 'Arms' },
    { name: 'Hammer Curl', type: 'Strength', category: 'Arms' },
    { name: 'Tricep Dips', type: 'Strength', category: 'Arms' },
    { name: 'Tricep Pushdown (Cable)', type: 'Strength', category: 'Arms' },
    { name: 'Skull Crushers', type: 'Strength', category: 'Arms' },
    // Core
    { name: 'Crunches', type: 'Strength', category: 'Core' },
    { name: 'Plank', type: 'Strength', category: 'Core' },
    { name: 'Hanging Leg Raises', type: 'Strength', category: 'Core' },
    { name: 'Russian Twists', type: 'Strength', category: 'Core' },
    { name: 'Ab Rollouts', type: 'Strength', category: 'Core' },
    // Full-Body & Functional
    { name: 'Burpees', type: 'Strength', category: 'Full-Body' },
    { name: 'Kettlebell Swings', type: 'Strength', category: 'Full-Body' },
    { name: 'Clean and Press', type: 'Strength', category: 'Full-Body' },
    // Cardio
    { name: 'Treadmill', type: 'Cardio', category: 'Cardio' },
    { name: 'Elliptical Trainer', type: 'Cardio', category: 'Cardio' },
    { name: 'Stationary Bike', type: 'Cardio', category: 'Cardio' },
    { name: 'Rowing Machine', type: 'Cardio', category: 'Cardio' },
    { name: 'Running', type: 'Cardio', category: 'Cardio' },
];

const ROUTINES_DATA = [
    {
        name: "Push/Pull/Legs (PPL)",
        description: "A popular split organizing workouts by movement pattern. Excellent for building balanced strength and muscle.",
        split: [
            { day: "Push Day (Chest, Shoulders, Triceps)", exercises: ["Barbell Bench Press", "Overhead Press (Barbell)", "Incline Dumbbell Press", "Lateral Raises", "Tricep Pushdown (Cable)", "Pec Deck"] },
            { day: "Pull Day (Back, Biceps)", exercises: ["Wide Grip Pull-Ups", "Bent Over Barbell Row", "Lat Pulldown", "Seated Cable Row", "Barbell Curl", "Hammer Curl"] },
            { day: "Legs Day (Quads, Hamstrings, Glutes)", exercises: ["Barbell Back Squat", "Romanian Deadlifts", "Leg Press", "Leg Extension Machine", "Seated Leg Curl Machine", "Calf Raises"] }
        ]
    },
    {
        name: "Upper/Lower Split",
        description: "Ideal for a 4-day-a-week routine, this split dedicates days to your upper and lower body for focused training and ample recovery.",
        split: [
            { day: "Upper Body A", exercises: ["Barbell Bench Press", "Single-Arm Dumbbell Row", "Incline Dumbbell Press", "Lat Pulldown", "Lateral Raises", "Dumbbell Curl"] },
            { day: "Lower Body A", exercises: ["Barbell Back Squat", "Seated Leg Curl Machine", "Walking Lunges", "Calf Raises", "Hanging Leg Raises"] },
            { day: "Upper Body B", exercises: ["Overhead Press (Barbell)", "Wide Grip Pull-Ups", "Dumbbell Bench Press", "Seated Cable Row", "Face Pulls", "Tricep Pushdown (Cable)"] },
            { day: "Lower Body B", exercises: ["Standard Deadlifts", "Leg Press", "Hip Thrusts", "Leg Extension Machine", "Plank"] }
        ]
    },
    {
        name: "Full Body Routine",
        description: "A great routine for beginners or those with limited time, hitting all major muscle groups 3 times a week for comprehensive development.",
        split: [
            { day: "Workout A", exercises: ["Barbell Back Squat", "Barbell Bench Press", "Bent Over Barbell Row", "Lateral Raises", "Crunches"] },
            { day: "Workout B", exercises: ["Standard Deadlifts", "Overhead Press (Barbell)", "Wide Grip Pull-Ups", "Walking Lunges", "Plank"] },
            { day: "Workout C", exercises: ["Leg Press", "Incline Dumbbell Bench Press", "Seated Cable Row", "Kettlebell Swings", "Hanging Leg Raises"] }
        ]
    }
];

type WorkoutFormData = Omit<Workout, 'id' | 'timestamp' | 'calories'>;

const App = () => {
    const [workouts, setWorkouts] = useState<Workout[]>(() => { try { const saved = localStorage.getItem('workouts'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; } });
    const [exerciseLibrary, setExerciseLibrary] = useState<Exercise[]>(() => {
        try {
            const saved = localStorage.getItem('exerciseLibrary');
            const savedLibrary: Exercise[] = saved ? JSON.parse(saved) : [];
            const combined = [...NEW_EXERCISE_DB];
            const builtInNames = new Set(NEW_EXERCISE_DB.map(e => e.name));
            savedLibrary.forEach(savedEx => { if (!builtInNames.has(savedEx.name)) { combined.push(savedEx); } });
            return combined;
        } catch (e) { return NEW_EXERCISE_DB; }
    });
    
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [activeTab, setActiveTab] = useState('summary');
    const [view, setView] = useState<{ name: 'main' | 'detail', data: any }>({ name: 'main', data: null });
    const [exerciseToLog, setExerciseToLog] = useState<Exercise | null>(null);
    const [addExerciseModalData, setAddExerciseModalData] = useState<WorkoutFormData | null>(null);
    const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => { localStorage.setItem('workouts', JSON.stringify(workouts)); }, [workouts]);
    useEffect(() => { localStorage.setItem('exerciseLibrary', JSON.stringify(exerciseLibrary)); }, [exerciseLibrary]);

    const historicalWorkouts = useMemo(() => {
        const history = workouts.reduce((acc: Record<string, Workout[]>, workout) => {
            const date = new Date(workout.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            if (!acc[date]) acc[date] = []; acc[date].push(workout); return acc;
        }, {});
        return Object.entries(history).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
    }, [workouts]);
    
    const calculateCalories = ({ type, duration, sets }: { type: string, duration?: number, sets?: Partial<SetData>[] }) => {
        if (type === 'Cardio') return Math.round((duration || 0) * 8.5);
        if (!sets) return 0;
        const totalVolume = sets.reduce((acc, set) => acc + ( (set.weight || 0) * (set.reps || 0) ), 0);
        return Math.round(totalVolume * 0.15);
    };

    const addWorkout = (workout: WorkoutFormData) => {
        const newWorkout = { id: Date.now(), timestamp: new Date(`${workout.date}T${new Date().toTimeString().split(' ')[0]}`).toISOString(), ...workout, calories: calculateCalories(workout) };
        setWorkouts(prev => [...prev, newWorkout]);
        setFormKey(k => k + 1); // Reset form by changing key
    };

    const handleUpdateWorkout = (updatedWorkoutData: Workout) => {
        const updatedWorkout = { ...updatedWorkoutData, calories: calculateCalories(updatedWorkoutData) };
        setWorkouts(prev => prev.map(w => w.id === updatedWorkout.id ? updatedWorkout : w));
        setEditingWorkout(null);
    };

    const handleDeleteWorkout = (workoutId: number) => {
        setWorkouts(prev => prev.filter(w => w.id !== workoutId));
        setEditingWorkout(null);
    };

    const handleSelectExerciseHistory = (exerciseName: string) => setView({ name: 'detail', data: exerciseName });
    const handleBackToMain = () => setView({ name: 'main', data: null });
    const handleAddExerciseFromLibrary = (exercise: Exercise) => { setExerciseToLog(exercise); setActiveTab('summary'); };
    const handleAddCustomExercise = (newExercise: Exercise) => { if (!exerciseLibrary.some(ex => ex.name.toLowerCase() === newExercise.name.toLowerCase())) { setExerciseLibrary(prev => [...prev, newExercise]); } };
    
    const handleShowAddExerciseModal = (workoutData: WorkoutFormData) => setAddExerciseModalData(workoutData);

    const handleSaveNewExercise = (newExercise: Exercise, workoutData: WorkoutFormData) => {
        handleAddCustomExercise(newExercise);
        addWorkout(workoutData);
        setAddExerciseModalData(null);
    };
    
    const handleAddRoutineToLog = (exerciseNames: string[]) => {
        const reversedWorkouts = [...workouts].reverse();
        const newWorkouts = exerciseNames.map((name, index) => {
            const exerciseInfo = exerciseLibrary.find(e => e.name === name);
            if (!exerciseInfo) return null;

            const lastInstance = reversedWorkouts.find(w => w.name === name);
            let newWorkoutData: WorkoutFormData;

            if (exerciseInfo.type === 'Strength') {
                const sets = lastInstance?.sets && lastInstance.sets.length > 0 ? lastInstance.sets : [{ weight: 0, reps: 0 }, { weight: 0, reps: 0 }, { weight: 0, reps: 0 }];
                newWorkoutData = { name, type: 'Strength', date: currentDate, sets };
            } else {
                const duration = lastInstance?.duration || 30;
                newWorkoutData = { name, type: 'Cardio', date: currentDate, duration };
            }
            
            return { ...newWorkoutData, id: Date.now() + index, timestamp: new Date().toISOString(), calories: calculateCalories(newWorkoutData) };
        }).filter((w): w is Workout => w !== null);

        setWorkouts(prev => [...prev, ...newWorkouts]);
        setActiveTab('summary');
    };

    const allCategories = useMemo(() => [...new Set(exerciseLibrary.map(e => e.category))], [exerciseLibrary]);

    if (view.name === 'detail') return <ExerciseDetailView exerciseName={view.data} workouts={workouts} onBack={handleBackToMain} />;

    return (
        <div style={styles.container}>
            <GlobalStyles />
            <Header />
            {addExerciseModalData && (
                <AddExerciseModal
                    workoutData={addExerciseModalData}
                    onClose={() => setAddExerciseModalData(null)}
                    onSave={handleSaveNewExercise}
                    categories={allCategories}
                />
            )}
            {editingWorkout && (
                <EditWorkoutModal 
                    workout={editingWorkout}
                    onClose={() => setEditingWorkout(null)}
                    onSave={handleUpdateWorkout}
                    onDelete={handleDeleteWorkout}
                />
            )}
            <main style={styles.main} key={activeTab}>
                {activeTab === 'summary' && (
                    <div style={styles.contentWrapper}>
                        <WorkoutForm 
                            key={formKey}
                            onAddWorkout={addWorkout} 
                            exerciseLibrary={exerciseLibrary} 
                            exerciseToLog={exerciseToLog} 
                            clearExerciseToLog={() => setExerciseToLog(null)} 
                            currentDate={currentDate} 
                            onDateChange={setCurrentDate}
                            onShowAddExerciseModal={handleShowAddExerciseModal}
                        />
                        <TodaysWorkout workouts={workouts} date={currentDate} onEditWorkout={setEditingWorkout} />
                        <WorkoutHistory historicalWorkouts={historicalWorkouts} onSelectExercise={handleSelectExerciseHistory} />
                    </div>
                )}
                {activeTab === 'library' && 
                    <div style={styles.contentWrapper}>
                        <ExerciseLibrary 
                            exerciseLibrary={exerciseLibrary} 
                            onAddFromLibrary={handleAddExerciseFromLibrary} 
                            onAddCustom={handleAddCustomExercise}
                            onAddRoutineToLog={handleAddRoutineToLog}
                        />
                    </div>
                }
            </main>
            <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

const Header = () => (
    <header style={styles.header}>
        <div style={styles.summaryHeader}>
            <span style={styles.summaryTitle}>Gymbrootan</span>
            <span style={styles.profilePic}></span>
        </div>
    </header>
);

const TodaysWorkout = ({ workouts, date, onEditWorkout }: { workouts: Workout[], date: string, onEditWorkout: (workout: Workout) => void }) => {
    const todaysWorkouts = workouts.filter(w => w.date === date);
    const totalVolume = useMemo(() => todaysWorkouts.reduce((total, workout) => {
        if(workout.type !== 'Strength' || !workout.sets) return total;
        return total + workout.sets.reduce((workoutAcc, set) => workoutAcc + ((set.weight || 0) * (set.reps || 0)), 0);
    }, 0), [todaysWorkouts]);

    return (
        <div style={styles.formCard}>
            <h2 style={styles.cardTitle}>Today's Workout ({new Date(date + 'T00:00:00').toLocaleDateString('en-US', {month: 'short', day: 'numeric'})})</h2>
            {todaysWorkouts.length > 0 ? (
                <>
                {totalVolume > 0 && <p style={styles.totalVolume}>Total Volume: <strong>{totalVolume.toLocaleString()} kg</strong></p>}
                <ul style={styles.historyList}>
                    {todaysWorkouts.map(w => (
                        <li key={w.id} style={styles.historyItem} onClick={() => onEditWorkout(w)} role="button" tabIndex={0}>
                             <div style={styles.workoutDetails}>
                                <strong>{w.name}</strong>
                                {w.type === 'Strength' && w.sets ? (
                                    <span>{w.sets.length} sets, {w.sets.reduce((acc, s) => acc + (s.reps || 0), 0)} reps</span>
                                ) : (
                                    <span>{w.duration} min</span>
                                )}
                            </div>
                            <div style={styles.workoutCalories}>
                                {w.calories} Cal
                            </div>
                        </li>
                    ))}
                </ul>
                </>
            ) : <p style={styles.noHistory}>No workouts logged for this day. Add a workout or select a routine from the library.</p>}
        </div>
    );
}

const WorkoutForm = ({ onAddWorkout, exerciseLibrary, exerciseToLog, clearExerciseToLog, currentDate, onDateChange, onShowAddExerciseModal }: { onAddWorkout: (workout: WorkoutFormData) => void, exerciseLibrary: Exercise[], exerciseToLog: Exercise | null, clearExerciseToLog: () => void, currentDate: string, onDateChange: (date: string) => void, onShowAddExerciseModal: (data: WorkoutFormData) => void }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<'Strength' | 'Cardio'>('Strength');
    const [duration, setDuration] = useState('');
    const [sets, setSets] = useState<{weight: string|number, reps: string|number}[]>([{ weight: '', reps: '' }]);
    const [suggestions, setSuggestions] = useState<Exercise[]>([]);

    useEffect(() => {
        if(exerciseToLog){ setName(exerciseToLog.name); setType(exerciseToLog.type); clearExerciseToLog(); }
    }, [exerciseToLog, clearExerciseToLog]);
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (value.length > 1) setSuggestions(exerciseLibrary.filter(ex => ex.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5));
        else setSuggestions([]);
    };
    
    useEffect(() => {
        const selected = exerciseLibrary.find(ex => ex.name.toLowerCase() === name.toLowerCase());
        if(selected) setType(selected.type);
    }, [name, exerciseLibrary]);

    const handleSuggestionClick = (suggestion: Exercise) => { setName(suggestion.name); setType(suggestion.type); setSuggestions([]); };
    const handleSetChange = (index: number, field: 'weight' | 'reps', value: string) => { const newSets = [...sets]; newSets[index][field] = value === '' ? '' : Number(value); setSets(newSets); };
    const addSet = () => setSets([...sets, { weight: '', reps: '' }]);
    const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim()) return;

        const exerciseExists = exerciseLibrary.some(ex => ex.name.toLowerCase() === name.toLowerCase());
        const workoutData = type === 'Strength' 
            ? { name, type, date: currentDate, sets: sets.map(s => ({weight: Number(s.weight) || 0, reps: Number(s.reps) || 0})).filter(s => s.reps > 0) } 
            : { name, type, date: currentDate, duration: Number(duration) };

        if (exerciseExists) {
            onAddWorkout(workoutData);
        } else {
            onShowAddExerciseModal(workoutData);
        }
    };
    
    const selectedExercise = useMemo(() => exerciseLibrary.find(ex => ex.name.toLowerCase() === name.toLowerCase()), [name, exerciseLibrary]);

    return (
        <div style={styles.formCard}>
            <h2 style={styles.cardTitle}>Log Workout</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                 <input type="date" value={currentDate} onChange={e => onDateChange(e.target.value)} style={styles.input} required />
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {selectedExercise && <ExerciseIcon category={selectedExercise.category} style={styles.formThumbnail} />}
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input type="text" placeholder="Exercise Name" value={name} onChange={handleNameChange} style={styles.input} required />
                        {suggestions.length > 0 && (
                            <ul style={styles.suggestionsList}>
                                {suggestions.map(s => (
                                    <li key={s.name} onClick={() => handleSuggestionClick(s)} style={styles.suggestionItem} className="suggestionItem">
                                        {s.name} <span style={styles.suggestionCategory}>({s.category})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {type === 'Strength' ? (
                    <div style={styles.setsContainer}>
                        <div style={styles.setRowHeader}><span>Set</span><span>Weight (kg)</span><span>Reps</span><span></span></div>
                        {sets.map((set, index) => (
                            <div key={index} style={styles.setRow}>
                                <span style={styles.setNumber}>{index + 1}</span>
                                <input type="number" placeholder="0" value={set.weight} onChange={e => handleSetChange(index, 'weight', e.target.value)} style={styles.setInput} />
                                <input type="number" placeholder="0" value={set.reps} onChange={e => handleSetChange(index, 'reps', e.target.value)} style={styles.setInput} />
                                <button type="button" onClick={() => removeSet(index)} style={styles.removeSetBtn}>&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={addSet} style={styles.addSetBtn}>+ Add Set</button>
                    </div>
                ) : (
                    <input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} style={styles.input} required />
                )}
                <button type="submit" style={styles.button} className="button">Add Workout</button>
            </form>
        </div>
    );
};


const WorkoutHistory = ({ historicalWorkouts, onSelectExercise }: { historicalWorkouts: [string, Workout[]][], onSelectExercise: (name: string) => void }) => (
    <div style={styles.historyCard}>
        <h2 style={styles.cardTitle}>Logbook</h2>
        {historicalWorkouts.length > 0 ? (
            historicalWorkouts.map(([date, workoutsOnDate]) => (
                <div key={date}>
                    <h3 style={styles.historyDate}>{date}</h3>
                    <ul style={styles.historyList}>
                        {workoutsOnDate.map(w => (
                            <li key={w.id} style={styles.historyItem} onClick={() => onSelectExercise(w.name)} role="button" tabIndex={0}>
                                <div style={styles.workoutDetails}>
                                    <strong>{w.name}</strong>
                                    {w.type === 'Strength' && w.sets ? (
                                        <span>{w.sets.length}x{w.sets.reduce((t,s) => t + (s.reps || 0), 0)} reps</span>
                                    ) : (
                                        <span>{w.duration} min</span>
                                    )}
                                </div>
                                <div style={styles.workoutCalories}>{w.calories} Cal</div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))
        ) : <p style={styles.noHistory}>Log your first workout to see history.</p>}
    </div>
);

const AddCustomExerciseForm = ({ category, onAddCustom }: { category: string, onAddCustom: (ex: Exercise) => void }) => {
    const [name, setName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (name.trim()) { onAddCustom({ name: name.trim(), type: category === 'Cardio' ? 'Cardio' : 'Strength', category }); setName(''); setIsAdding(false); } };
    if (!isAdding) return <button onClick={() => setIsAdding(true)} style={styles.addCustomBtn}>+ Add Custom Exercise</button>;
    return (
        <form onSubmit={handleSubmit} style={styles.addCustomForm}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="New Exercise Name" style={{...styles.input, padding: '8px 10px'}} autoFocus />
            <button type="submit" style={{...styles.button, padding: '8px 10px', fontSize: '14px'}} className="button">Save</button>
            <button type="button" onClick={() => setIsAdding(false)} style={{...styles.removeSetBtn, color: 'var(--text-secondary)'}}>Cancel</button>
        </form>
    );
};

const RoutineSection = ({ onAddRoutineToLog }: { onAddRoutineToLog: (exercises: string[]) => void }) => {
    const [openRoutines, setOpenRoutines] = useState<Record<string, boolean>>({});
    const toggleRoutine = (routineName: string) => {
        setOpenRoutines(prev => ({ ...prev, [routineName]: !prev[routineName] }));
    };

    return (
        <div style={{...styles.libraryCard, paddingBottom: '0px', marginBottom: '20px'}}>
            <h2 style={styles.cardTitle}>Workout Routines</h2>
            {ROUTINES_DATA.map(routine => (
                <div key={routine.name} style={styles.categoryWrapper} className="categoryWrapper">
                    <button onClick={() => toggleRoutine(routine.name)} style={styles.categoryHeader}>
                        <span>{routine.name}</span>
                        <span style={styles.categoryToggleIcon}>{openRoutines[routine.name] ? '−' : '+'}</span>
                    </button>
                    <div style={{...styles.libraryListContainer, maxHeight: openRoutines[routine.name] ? `800px` : '0px'}}>
                        <div style={styles.routineContent}>
                            <p style={styles.routineDescription}>{routine.description}</p>
                            {routine.split.map(splitDay => (
                                <div key={splitDay.day} style={styles.routineDay}>
                                    <div style={styles.routineDayHeader}>
                                        <h4 style={styles.routineDayTitle}>{splitDay.day}</h4>
                                        <button onClick={() => onAddRoutineToLog(splitDay.exercises)} style={styles.routineAddBtn} className="button">Add to Log</button>
                                    </div>
                                    <ul style={styles.routineExerciseList}>
                                        {splitDay.exercises.map(ex => <li key={ex}>{ex}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const ExerciseLibrary = ({ exerciseLibrary, onAddFromLibrary, onAddCustom, onAddRoutineToLog }: { exerciseLibrary: Exercise[], onAddFromLibrary: (ex: Exercise) => void, onAddCustom: (ex: Exercise) => void, onAddRoutineToLog: (ex: string[]) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const categories = useMemo(() => {
        const filtered = exerciseLibrary.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered.reduce((acc: Record<string, Exercise[]>, ex) => {
            if (!acc[ex.category]) acc[ex.category] = [];
            acc[ex.category].push(ex); return acc;
        }, {});
    }, [searchTerm, exerciseLibrary]);
    
    const toggleCategory = (category: string) => setOpenCategories(prev => ({...prev, [category]: !prev[category]}));

    return (
        <>
        <RoutineSection onAddRoutineToLog={onAddRoutineToLog} />
        <div style={styles.libraryCard}>
            <h2 style={styles.cardTitle}>Exercise Library</h2>
            <input type="text" placeholder="Search exercises..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{...styles.input, marginBottom: '20px'}}/>
            {Object.entries(categories).sort((a,b) => a[0].localeCompare(b[0])).map(([category, exercises]) => (
                <div key={category} style={styles.categoryWrapper} className="categoryWrapper">
                    <button onClick={() => toggleCategory(category)} style={styles.categoryHeader}>
                        <ExerciseIcon category={category} style={{width: 32, height: 32, marginRight: 12}} />
                        <span>{category}</span>
                        <span style={styles.categoryToggleIcon}>{openCategories[category] ? '−' : '+'}</span>
                    </button>
                    <div style={{...styles.libraryListContainer, maxHeight: openCategories[category] ? `${exercises.length * 69 + 60}px` : '0px'}}>
                        <ul style={styles.libraryList}>
                            {exercises.sort((a,b) => a.name.localeCompare(b.name)).map((ex, index) => (
                                <li key={ex.name} style={{...styles.libraryItem, animationDelay: `${index * 50}ms`}}>
                                    <div style={styles.libraryItemDetails}>
                                      <span style={styles.libraryItemName}>{ex.name}</span>
                                      <span style={styles.libraryItemType}>{ex.type}</span>
                                    </div>
                                    <button onClick={() => onAddFromLibrary(ex)} style={styles.libraryAddBtn} className="libraryAddBtn">+</button>
                                </li>
                            ))}
                        </ul>
                       <AddCustomExerciseForm category={category} onAddCustom={onAddCustom} />
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

const AddExerciseModal = ({ workoutData, onClose, onSave, categories }: { workoutData: WorkoutFormData, onClose: () => void, onSave: (newExercise: Exercise, workoutData: WorkoutFormData) => void, categories: string[] }) => {
    const [category, setCategory] = useState(categories[0] || 'Uncategorized');
    const [type, setType] = useState<'Strength' | 'Cardio'>('Strength');

    const handleSave = () => {
        const newExercise: Exercise = { name: workoutData.name, category, type };
        onSave(newExercise, workoutData);
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h3 style={styles.modalTitle}>Add New Exercise</h3>
                <p style={styles.modalText}>"{workoutData.name}" is not in your library. Please add a category to save it.</p>
                <div style={styles.form}>
                    <label style={styles.modalLabel}>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} style={styles.input}>
                        {categories.sort().map(cat => <option key={cat} value={cat}>{cat}</option>)}
                         <option value="Uncategorized">Uncategorized</option>
                    </select>
                    <label style={styles.modalLabel}>Type</label>
                    <select value={type} onChange={e => setType(e.target.value as any)} style={styles.input}>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                    </select>
                </div>
                <div style={styles.modalActions}>
                    <button onClick={onClose} style={styles.modalButtonSecondary}>Cancel</button>
                    <button onClick={handleSave} style={{...styles.button, flex: 1}} className="button">Save and Log</button>
                </div>
            </div>
        </div>
    );
};

const EditWorkoutModal = ({ workout, onClose, onSave, onDelete }: { workout: Workout, onClose: () => void, onSave: (w: Workout) => void, onDelete: (id: number) => void }) => {
    const [duration, setDuration] = useState(workout.duration?.toString() || '');
    const [sets, setSets] = useState(workout.sets?.map(s => ({...s, weight: s.weight.toString(), reps: s.reps.toString()})) || [{ weight: '', reps: '' }]);
    
    useEffect(() => {
        setDuration(workout.duration?.toString() || '');
        setSets(workout.sets?.map(s => ({ ...s, weight: s.weight.toString(), reps: s.reps.toString() })) || [{ weight: '', reps: '' }]);
    }, [workout]);

    const handleSetChange = (index: number, field: 'weight' | 'reps', value: string) => {
        const newSets = [...sets];
        newSets[index][field] = value;
        setSets(newSets);
    };
    const addSet = () => setSets([...sets, { weight: '', reps: '' }]);
    const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

    const handleSave = () => {
        const updatedWorkout: Workout = {
            ...workout,
            duration: workout.type === 'Cardio' ? Number(duration) : undefined,
            sets: workout.type === 'Strength' ? sets.map(s => ({ weight: Number(s.weight) || 0, reps: Number(s.reps) || 0 })).filter(s => s.reps > 0) : undefined
        };
        onSave(updatedWorkout);
    };
    
    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete this ${workout.name} log?`)) {
            onDelete(workout.id);
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h3 style={styles.modalTitle}>Edit Workout</h3>
                <p style={styles.modalText}>{workout.name}</p>
                <div style={styles.form}>
                    {workout.type === 'Strength' ? (
                        <div style={styles.setsContainer}>
                            <div style={styles.setRowHeader}><span>Set</span><span>Weight (kg)</span><span>Reps</span><span></span></div>
                            {sets.map((set, index) => (
                                <div key={index} style={styles.setRow}>
                                    <span style={styles.setNumber}>{index + 1}</span>
                                    <input type="number" placeholder="0" value={set.weight} onChange={e => handleSetChange(index, 'weight', e.target.value)} style={styles.setInput} />
                                    <input type="number" placeholder="0" value={set.reps} onChange={e => handleSetChange(index, 'reps', e.target.value)} style={styles.setInput} />
                                    <button type="button" onClick={() => removeSet(index)} style={styles.removeSetBtn}>&times;</button>
                                </div>
                            ))}
                            <button type="button" onClick={addSet} style={styles.addSetBtn}>+ Add Set</button>
                        </div>
                    ) : (
                        <input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} style={styles.input} required />
                    )}
                </div>
                <div style={styles.modalActions}>
                    <button onClick={handleDelete} style={{...styles.modalButtonSecondary, flex: '0 0 auto', color: '#ff453a', borderColor: '#ff453a'}}>Delete</button>
                    <button onClick={onClose} style={{...styles.modalButtonSecondary, flex: 1}}>Cancel</button>
                    <button onClick={handleSave} style={{...styles.button, flex: 2}} className="button">Save Changes</button>
                </div>
            </div>
        </div>
    );
};


const ProgressGraph = ({ data, yAxisLabel, unit }: {data: {x: number, y: number}[], yAxisLabel: string, unit: string}) => {
    const [tooltip, setTooltip] = useState<{x: number, y: number, data: {x: number, y: number}} | null>(null);
    if (!Array.isArray(data) || data.length < 2) return <p style={styles.noHistory}>Not enough data to show progress.</p>;

    const width = 340, height = 180, padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const xValues = data.map(d => d.x), yValues = data.map(d => d.y);
    const minX = Math.min(...xValues), maxX = Math.max(...xValues), maxY = Math.max(...yValues);
    const getX = (x: number) => padding.left + ((x - minX) / (maxX - minX)) * (width - padding.left - padding.right);
    const getY = (y: number) => height - padding.bottom - ((y) / (maxY)) * (height - padding.top - padding.bottom);
    const getPathCoordinates = (d: {x: number, y: number}) => [getX(d.x), getY(d.y)];
    const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getPathCoordinates(d).join(',')}`).join(' ');
    const areaPath = `${linePath} V ${height - padding.bottom} H ${padding.left} Z`;
    const yAxisTicks = useMemo(() => Array.from({length: 5}, (_, i) => { const v = Math.round((maxY / 4) * i); return { value: v, y: getY(v) }; }), [maxY, getY]);
    
    return (
        <div style={{ position: 'relative' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }} role="img">
                <defs>
                    <linearGradient id="progressGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--secondary-accent)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {yAxisTicks.map(tick => (<g key={tick.value}><line x1={padding.left} y1={tick.y} x2={width-padding.right} y2={tick.y} stroke="var(--border-color)" strokeWidth="0.5" /><text x={padding.left - 8} y={tick.y + 4} textAnchor="end" fill="var(--text-secondary)" fontSize="10">{tick.value}</text></g>))}
                <text x={padding.left} y={height - 10} fill="var(--text-secondary)" fontSize="10">{new Date(minX).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</text>
                <text x={width - padding.right} y={height - 10} textAnchor="end" fill="var(--text-secondary)" fontSize="10">{new Date(maxX).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</text>
                <path d={areaPath} fill="url(#progressGradient)" />
                <path d={linePath} fill="none" stroke="url(#progressGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((d, i) => (<circle key={i} cx={getX(d.x)} cy={getY(d.y)} r="8" fill="transparent" onMouseEnter={() => setTooltip({x: getX(d.x), y: getY(d.y), data:d})} onMouseLeave={() => setTooltip(null)} />))}
                {tooltip && (<circle cx={tooltip.x} cy={tooltip.y} r="4" fill="var(--primary-accent)" stroke="var(--background)" strokeWidth="2" style={{pointerEvents: 'none'}}/>)}
            </svg>
            {tooltip && (<div style={{...styles.graphTooltip, left: `${tooltip.x}px`, top: `${tooltip.y}px`}}><div style={styles.graphTooltipContent}><strong>{tooltip.data.y} {unit}</strong><span>{new Date(tooltip.data.x).toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric'})}</span></div></div>)}
        </div>
    );
};

const ExerciseDetailView = ({ exerciseName, workouts, onBack }: { exerciseName: string, workouts: Workout[], onBack: () => void }) => {
    const history = useMemo(() => workouts.filter(w => w.name === exerciseName).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()), [workouts, exerciseName]);
    const exerciseType = history.length > 0 ? history[0].type : 'Strength';
    const graphData = useMemo(() => {
        if (exerciseType === 'Strength') {
            const dailyMax = history.reduce((acc: Record<string, {y: number, timestamp: number}>, workout) => {
                const date = new Date(workout.timestamp).toISOString().split('T')[0];
                const maxWeight = workout.sets ? Math.max(0, ...workout.sets.map(s => s.weight || 0)) : 0;
                if (!acc[date] || maxWeight > acc[date].y) acc[date] = {y: maxWeight, timestamp: new Date(workout.timestamp).getTime()};
                return acc;
            }, {});
            return Object.values(dailyMax).map(e => ({ x: e.timestamp, y: e.y })).sort((a,b) => a.x - b.x);
        }
        return history.map(w => ({ x: new Date(w.timestamp).getTime(), y: w.duration || 0 }));
    }, [history, exerciseType]);

    return (
        <div style={styles.detailContainer}>
            <header style={styles.detailHeader}><button onClick={onBack} style={styles.backButton}>&lt; Summary</button></header>
            <main style={{...styles.main, paddingTop: '16px'}}>
                <div style={{...styles.formCard, animation: 'fadeInUp 0.5s ease-out'}}>
                    <h2 style={styles.cardTitle}>{exerciseName}</h2>
                    <h3 style={styles.detailSubtitle}>Progress</h3>
                    <ProgressGraph data={graphData} yAxisLabel={exerciseType === 'Strength' ? 'Max Weight' : 'Duration'} unit={exerciseType === 'Strength' ? 'kg' : 'min'}/>
                    <h3 style={{...styles.detailSubtitle, marginTop: '24px'}}>Logbook</h3>
                     <ul style={styles.historyList}>
                        {history.slice().reverse().map(w => (
                            <li key={w.id} style={{...styles.historyItem, cursor: 'default'}}>
                                <div style={styles.workoutDetails}>
                                    <strong>{new Date(w.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                                    {w.type === 'Strength' && w.sets ? (<span>{w.sets.map(s => `${s.weight || 0}kg x ${s.reps || 0}`).join(', ')}</span>) : (<span>{w.duration} min</span>)}
                                </div>
                                <div style={styles.workoutCalories}>{w.calories} Cal</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

const Footer = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
    <footer style={styles.footer}>
        <div style={styles.footerNav}>
            <div style={activeTab === 'summary' ? {...styles.footerItem, ...styles.footerItemActive} : styles.footerItem} onClick={() => setActiveTab('summary')}>
                <svg style={styles.footerIcon} viewBox="0 0 24 24"><path fill="currentColor" d="M12,1L2,12h3v8h14v-8h3M12,5.7l6,5.3v6H6v-6Z" /></svg>
                <span>Summary</span>
            </div>
            <div style={activeTab === 'library' ? {...styles.footerItem, ...styles.footerItemActive} : styles.footerItem} onClick={() => setActiveTab('library')}>
                 <svg style={styles.footerIcon} viewBox="0 0 24 24"><path fill="currentColor" d="M18,2H6C4.9,2,4,2.9,4,4V20C4,21.1,4.9,22,6,22H18C19.1,22,20,21.1,20,20V4C20,2.9,19.1,2,18,2M6,4H11V12L8.5,10.5L6,12V4M18,20H6V14L8.5,12.5L11,14V4H18V20Z" /></svg>
                <span>Library</span>
            </div>
        </div>
        <p style={styles.signature}>© {new Date().getFullYear()} BK Productions</p>
    </footer>
);


const GlobalStyles = () => (
    <style>{`
        .button:hover {
            filter: brightness(1.1);
        }
        .button:active {
            transform: scale(0.98);
        }
        .suggestionItem:hover {
            background-color: var(--border-color);
        }
        .categoryWrapper:last-child {
            border-bottom: none;
        }
        .libraryAddBtn:active {
            transform: scale(0.9);
        }
    `}</style>
);

const styles: Record<string, React.CSSProperties> = {
    container: { maxWidth: '450px', margin: '0 auto', backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    main: { flex: 1, padding: '0 16px 80px 16px', },
    contentWrapper: { animation: 'fadeInUp 0.5s ease-out forwards' },
    header: { padding: '8px 16px 16px 16px' },
    summaryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' },
    summaryTitle: { fontSize: '34px', fontWeight: '800', background: 'linear-gradient(45deg, var(--primary-accent), var(--secondary-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    profilePic: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--button-bg)', backgroundImage: 'url(https://i.pravatar.cc/80)', backgroundSize: 'cover' },
    formCard: { backgroundColor: 'var(--surface)', borderRadius: '16px', padding: '16px', marginBottom: '20px', border: '1px solid var(--border-color)', transition: 'transform 0.2s, box-shadow 0.2s', },
    cardTitle: { margin: '0 0 16px 0', fontSize: '20px', fontWeight: '700' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px' },
    input: { backgroundColor: 'var(--button-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '16px', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s' },
    button: { background: 'linear-gradient(45deg, var(--primary-accent), var(--secondary-accent))', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s, filter 0.2s' },
    historyCard: { backgroundColor: 'var(--surface)', borderRadius: '16px', padding: '16px', marginBottom: '20px', border: '1px solid var(--border-color)' },
    historyDate: { fontSize: '14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' },
    historyList: { listStyle: 'none', padding: 0, margin: 0 },
    historyItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 4px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' },
    workoutDetails: { display: 'flex', flexDirection: 'column', gap: '4px' },
    workoutCalories: { background: 'linear-gradient(45deg, var(--primary-accent), var(--secondary-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700', alignSelf: 'center' },
    noHistory: { color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' },
    footer: { position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '450px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(28, 28, 30, 0.85)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-color)', padding: '8px 0 16px 0', gap: '8px' },
    footerNav: { display: 'flex', justifyContent: 'space-around', width: '100%' },
    footerItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '10px', cursor: 'pointer', transition: 'color 0.2s, transform 0.2s' },
    footerItemActive: { color: 'var(--primary-accent)' },
    footerIcon: { width: '28px', height: '28px' },
    signature: { margin: 0, fontSize: '12px', color: 'var(--text-secondary)', opacity: 0.8 },
    suggestionsList: { position: 'absolute', width: '100%', backgroundColor: '#2c2c2e', border: '1px solid var(--border-color)', borderRadius: '8px', listStyle: 'none', padding: '0', margin: '4px 0 0 0', zIndex: 10, maxHeight: '200px', overflowY: 'auto' },
    suggestionItem: { padding: '12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' },
    suggestionCategory: { fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' },
    libraryCard: { backgroundColor: 'var(--surface)', borderRadius: '16px', padding: '16px', marginBottom: '80px', border: '1px solid var(--border-color)' },
    categoryWrapper: { borderBottom: '1px solid var(--border-color)' },
    categoryHeader: { background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '18px', fontWeight: '600', padding: '16px 4px', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center' },
    categoryToggleIcon: { marginLeft: 'auto', fontSize: '24px', color: 'var(--text-secondary)', fontWeight: '300' },
    libraryListContainer: { overflow: 'hidden', transition: 'max-height 0.4s ease-in-out' },
    libraryList: { listStyle: 'none', padding: '0 0 16px 0', margin: 0 },
    libraryItem: { display: 'flex', alignItems: 'center', padding: '10px 4px', borderBottom: '1px solid var(--border-color)', animation: 'scaleIn 0.3s ease-out forwards', opacity: 0 },
    libraryItemDetails: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1},
    libraryItemName: { fontWeight: '500' },
    libraryItemType: { fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: 'var(--button-bg)', padding: '2px 6px', borderRadius: '4px', alignSelf: 'flex-start' },
    libraryAddBtn: { background: 'var(--button-bg)', border: '1px solid var(--border-color)', color: 'var(--primary-accent)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '4px', transition: 'transform 0.2s' },
    detailContainer: { maxWidth: '450px', margin: '0 auto', backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    detailHeader: { padding: '16px', borderBottom: '1px solid var(--border-color)' },
    backButton: { background: 'none', border: 'none', color: 'var(--primary-accent)', fontSize: '16px', cursor: 'pointer', fontWeight: '600' },
    detailSubtitle: { fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '16px', marginBottom: '12px' },
    setsContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
    setRow: { display: 'grid', gridTemplateColumns: '30px 1fr 1fr 40px', gap: '10px', alignItems: 'center' },
    setRowHeader: { display: 'grid', gridTemplateColumns: '30px 1fr 1fr 40px', gap: '10px', color: 'var(--text-secondary)', fontSize: '12px', padding: '0 4px' },
    setNumber: { color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'center' },
    setInput: { backgroundColor: 'var(--button-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', color: 'var(--text-primary)', fontSize: '16px', textAlign: 'center', width: '100%', boxSizing: 'border-box' },
    removeSetBtn: { background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '24px', cursor: 'pointer', textAlign: 'center' },
    addSetBtn: { background: 'var(--button-bg)', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
    totalVolume: { color: 'var(--text-secondary)', fontSize: '14px', margin: '-8px 0 16px 0' },
    addCustomBtn: { background: 'none', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer', marginTop: '12px' },
    addCustomForm: { display: 'flex', gap: '10px', alignItems: 'center', marginTop: '12px', paddingLeft: '10px' },
    graphTooltip: { position: 'absolute', transform: 'translate(-50%, -125%)', pointerEvents: 'none', zIndex: 10 },
    graphTooltipContent: { backgroundColor: '#333', color: 'var(--text-primary)', padding: '6px 10px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px', gap: '2px', border: '1px solid var(--border-color)'},
    formThumbnail: { width: '44px', height: '44px', flexShrink: 0 },
    libraryIconContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--button-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' },
    libraryIcon: { width: '60%', height: '60%', color: 'var(--primary-accent)' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', animation: 'fadeInUp 0.3s' },
    modalContent: { backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '400px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', animation: 'scaleIn 0.3s' },
    modalTitle: { margin: '0 0 8px 0', fontSize: '22px', fontWeight: '700' },
    modalText: { margin: '0 0 20px 0', color: 'var(--text-secondary)', lineHeight: 1.5 },
    modalLabel: { fontWeight: '600', fontSize: '14px', marginBottom: '4px', display: 'block' },
    modalActions: { display: 'flex', gap: '12px', marginTop: '24px' },
    modalButtonSecondary: { flex: 1, backgroundColor: 'var(--button-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
    routineContent: { padding: '8px 16px 16px 16px' },
    routineDescription: { fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px 0', },
    routineDay: { marginBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px'},
    routineDayHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
    routineDayTitle: { fontSize: '16px', fontWeight: '600', color: 'var(--primary-accent)', margin: 0 },
    routineAddBtn: { background: 'var(--button-bg)', color: 'var(--primary-accent)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
    routineExerciseList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' },
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
