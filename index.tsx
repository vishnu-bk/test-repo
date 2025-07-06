import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
const SummaryIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13V3.5M12,11H18V13H12V11M12,15H18V17H12V15M8,11H10V13H8V11M8,15H10V17H8V15" />
    </svg>
);
const LibraryIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,2H5A3,3 0 0,0 2,5V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V5A3,3 0 0,0 19,2M17,18H7V16H17V18M17,14H7V12H17V14M17,10H7V8H17V10Z" />
    </svg>
);
const StatsIcon = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4,18H6V15H4V18M6.5,18H8.5V13H6.5V18M9,18H11V11H9V18M11.5,18H13.5V9H11.5V18M14,18H16V7H14V18M16.5,18H18.5V4H16.5V18M2,20H22V22H2V20Z" />
    </svg>
);
const ChevronIcon = ({ style, isExpanded }: { style: React.CSSProperties, isExpanded: boolean }) => (
    <svg style={{...style, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
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

interface SetData { weight: number; reps: number; }
interface Workout { id: number; timestamp: string; name: string; type: 'Strength' | 'Cardio'; category: string; date: string; sets?: SetData[]; duration?: number; calories: number; }
interface Exercise { name: string; type: 'Strength' | 'Cardio'; category: string; primaryMuscles: string[]; secondaryMuscles: string[]; }

const initialExerciseList: Omit<Exercise, 'primaryMuscles' | 'secondaryMuscles'>[] = [
    { name: 'Barbell Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Dumbbell Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Incline Barbell Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Incline Dumbbell Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Decline Barbell Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Decline Dumbbell Press', type: 'Strength', category: 'Chest' }, { name: 'Cable Chest Fly', type: 'Strength', category: 'Chest' }, { name: 'Dumbbell Chest Fly', type: 'Strength', category: 'Chest' }, { name: 'Incline Dumbbell Fly', type: 'Strength', category: 'Chest' }, { name: 'Push-Ups', type: 'Strength', category: 'Chest' }, { name: 'Pec Deck', type: 'Strength', category: 'Chest' }, { name: 'Close-Grip Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Guillotine Press', type: 'Strength', category: 'Chest' }, { name: 'Barbell Floor Press', type: 'Strength', category: 'Chest' }, { name: 'Dumbbell Floor Press', type: 'Strength', category: 'Chest' }, { name: 'Dumbbell Pullover', type: 'Strength', category: 'Chest' }, { name: 'Plate Squeeze Press', type: 'Strength', category: 'Chest' }, { name: 'Alternating Dumbbell Press', type: 'Strength', category: 'Chest' }, { name: 'Dumbbells-together Incline Bench Press', type: 'Strength', category: 'Chest' }, { name: 'Dumbbell Chest Press (Neutral Grip)', type: 'Strength', category: 'Chest' }, { name: 'One-Arm Dumbbell Fly', type: 'Strength', category: 'Chest' }, { name: 'Hex Press (Dumbbell Squeeze Press)', type: 'Strength', category: 'Chest' },
    { name: 'Wide Grip Pull-Ups', type: 'Strength', category: 'Back' }, { name: 'Lat Pulldown', type: 'Strength', category: 'Back' }, { name: 'Bent Over Barbell Row', type: 'Strength', category: 'Back' }, { name: 'Single-Arm Dumbbell Row', type: 'Strength', category: 'Back' }, { name: 'Seated Cable Row', type: 'Strength', category: 'Back' }, { name: 'Standard Deadlifts', type: 'Strength', category: 'Back' },
    { name: 'Barbell Back Squat', type: 'Strength', category: 'Legs' }, { name: 'Front Squat', type: 'Strength', category: 'Legs' }, { name: 'Leg Press', type: 'Strength', category: 'Legs' }, { name: 'Walking Lunges', type: 'Strength', 'category': 'Legs' }, { name: 'Leg Extension Machine', type: 'Strength', category: 'Legs' }, { name: 'Seated Leg Curl Machine', type: 'Strength', category: 'Legs' }, { name: 'Hip Thrusts', type: 'Strength', category: 'Legs' }, { name: 'Romanian Deadlifts', type: 'Strength', category: 'Legs' }, { name: 'Calf Raises', type: 'Strength', category: 'Legs' },
    { name: 'Overhead Press (Barbell)', type: 'Strength', category: 'Shoulders' }, { name: 'Arnold Press', type: 'Strength', category: 'Shoulders' }, { name: 'Lateral Raises', type: 'Strength', category: 'Shoulders' }, { name: 'Front Raises', type: 'Strength', category: 'Shoulders' }, { name: 'Upright Row', type: 'Strength', category: 'Shoulders' }, { name: 'Face Pulls', type: 'Strength', category: 'Shoulders' },
    { name: 'Barbell Curl', type: 'Strength', category: 'Arms' }, { name: 'Dumbbell Curl', type: 'Strength', category: 'Arms' }, { name: 'Preacher Curl', type: 'Strength', category: 'Arms' }, { name: 'Hammer Curl', type: 'Strength', category: 'Arms' }, { name: 'Tricep Dips', type: 'Strength', category: 'Arms' }, { name: 'Tricep Pushdown (Cable)', type: 'Strength', category: 'Arms' }, { name: 'Skull Crushers', type: 'Strength', category: 'Arms' },
    { name: 'Crunches', type: 'Strength', category: 'Core' }, { name: 'Plank', type: 'Strength', category: 'Core' }, { name: 'Hanging Leg Raises', type: 'Strength', category: 'Core' }, { name: 'Russian Twists', type: 'Strength', category: 'Core' }, { name: 'Ab Rollouts', type: 'Strength', category: 'Core' },
    { name: 'Burpees', type: 'Strength', category: 'Full-Body' }, { name: 'Kettlebell Swings', type: 'Strength', category: 'Full-Body' }, { name: 'Clean and Press', type: 'Strength', category: 'Full-Body' },
    { name: 'Treadmill', type: 'Cardio', category: 'Cardio' }, { name: 'Elliptical Trainer', type: 'Cardio', category: 'Cardio' }, { name: 'Stationary Bike', type: 'Cardio', category: 'Cardio' }, { name: 'Rowing Machine', type: 'Cardio', category: 'Cardio' }, { name: 'Running', type: 'Cardio', category: 'Cardio' },
];
const EXERCISE_MUSCLE_MAP: Record<string, { primary: string[], secondary: string[] }> = {
    'Barbell Bench Press': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'Incline Barbell Bench Press': { primary: ['Pectoralis Major (Clavicular Head)'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'Decline Barbell Bench Press': { primary: ['Pectoralis Major (Sternal Head)'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'Dumbbell Bench Press': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid', 'Triceps', 'Core Stabilizers'] }, 'Incline Dumbbell Bench Press': { primary: ['Pectoralis Major (Clavicular Head)'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'Decline Dumbbell Press': { primary: ['Pectoralis Major (Sternal Head)'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'Dumbbell Chest Fly': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid', 'Biceps'] }, 'Incline Dumbbell Fly': { primary: ['Pectoralis Major (Clavicular Head)'], secondary: ['Anterior Deltoid'] }, 'Push-Ups': { primary: ['Pectoralis Major', 'Serratus Anterior'], secondary: ['Anterior Deltoid', 'Triceps', 'Core'] }, 'Pec Deck': { primary: ['Pectoralis Major'], secondary: [] }, 'Close-Grip Bench Press': { primary: ['Triceps', 'Pectoralis Major (Inner)'], secondary: ['Anterior Deltoid'] }, 'Guillotine Press': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'Barbell Floor Press': { primary: ['Pectoralis Major', 'Triceps'], secondary: ['Anterior Deltoid'] }, 'Dumbbell Floor Press': { primary: ['Pectoralis Major', 'Triceps'], secondary: ['Anterior Deltoid'] }, 'Dumbbell Pullover': { primary: ['Pectoralis Major', 'Latissimus Dorsi'], secondary: ['Serratus Anterior', 'Triceps (Long Head)'] }, 'Plate Squeeze Press': { primary: ['Pectoralis Major (Inner)'], secondary: ['Triceps', 'Anterior Deltoid'] }, 'Alternating Dumbbell Press': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid', 'Triceps', 'Core', 'Obliques'] }, 'Dumbbells-together Incline Bench Press': { primary: ['Pectoralis Major (Clavicular Head)', 'Pectoralis Major (Inner)'], secondary: ['Triceps', 'Anterior Deltoid'] }, 'Dumbbell Chest Press (Neutral Grip)': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid', 'Triceps'] }, 'One-Arm Dumbbell Fly': { primary: ['Pectoralis Major'], secondary: ['Core', 'Obliques', 'Anterior Deltoid'] }, 'Hex Press (Dumbbell Squeeze Press)': { primary: ['Pectoralis Major (Inner)'], secondary: ['Triceps', 'Anterior Deltoid'] }, 'Cable Chest Fly': { primary: ['Pectoralis Major'], secondary: ['Anterior Deltoid'] },
    'Wide Grip Pull-Ups': { primary: ['Latissimus Dorsi'], secondary: ['Biceps', 'Trapezius', 'Posterior Deltoid'] }, 'Lat Pulldown': { primary: ['Latissimus Dorsi'], secondary: ['Biceps', 'Trapezius'] }, 'Bent Over Barbell Row': { primary: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'], secondary: ['Posterior Deltoid', 'Biceps', 'Erector Spinae'] }, 'Single-Arm Dumbbell Row': { primary: ['Latissimus Dorsi', 'Trapezius'], secondary: ['Biceps', 'Posterior Deltoid', 'Obliques'] }, 'Seated Cable Row': { primary: ['Latissimus Dorsi', 'Rhomboids', 'Trapezius'], secondary: ['Biceps', 'Posterior Deltoid'] }, 'Standard Deadlifts': { primary: ['Glutes', 'Hamstrings', 'Erector Spinae'], secondary: ['Quadriceps', 'Trapezius', 'Latissimus Dorsi', 'Core'] },
    'Barbell Back Squat': { primary: ['Quadriceps', 'Glutes'], secondary: ['Hamstrings', 'Adductors', 'Erector Spinae', 'Core'] }, 'Front Squat': { primary: ['Quadriceps', 'Glutes'], secondary: ['Core', 'Upper Back'] }, 'Leg Press': { primary: ['Quadriceps', 'Glutes'], secondary: ['Hamstrings', 'Adductors'] }, 'Walking Lunges': { primary: ['Quadriceps', 'Glutes'], secondary: ['Hamstrings', 'Adductors', 'Core'] }, 'Leg Extension Machine': { primary: ['Quadriceps'], secondary: [] }, 'Seated Leg Curl Machine': { primary: ['Hamstrings'], secondary: ['Calves'] }, 'Hip Thrusts': { primary: ['Glutes'], secondary: ['Hamstrings', 'Erector Spinae'] }, 'Romanian Deadlifts': { primary: ['Hamstrings', 'Glutes'], secondary: ['Erector Spinae', 'Forearms'] }, 'Calf Raises': { primary: ['Gastrocnemius', 'Soleus'], secondary: [] },
    'Overhead Press (Barbell)': { primary: ['Anterior Deltoid', 'Lateral Deltoid'], secondary: ['Triceps', 'Trapezius', 'Core'] }, 'Arnold Press': { primary: ['Anterior Deltoid', 'Lateral Deltoid'], secondary: ['Triceps', 'Trapezius'] }, 'Lateral Raises': { primary: ['Lateral Deltoid'], secondary: ['Trapezius'] }, 'Front Raises': { primary: ['Anterior Deltoid'], secondary: ['Trapezius'] }, 'Upright Row': { primary: ['Lateral Deltoid', 'Trapezius'], secondary: ['Biceps'] }, 'Face Pulls': { primary: ['Posterior Deltoid', 'Rhomboids', 'Trapezius'], secondary: [] },
    'Barbell Curl': { primary: ['Biceps'], secondary: ['Brachialis'] }, 'Dumbbell Curl': { primary: ['Biceps'], secondary: ['Brachialis'] }, 'Preacher Curl': { primary: ['Biceps'], secondary: ['Brachialis'] }, 'Hammer Curl': { primary: ['Brachialis', 'Biceps'], secondary: ['Forearms'] }, 'Tricep Dips': { primary: ['Triceps'], secondary: ['Anterior Deltoid', 'Pectoralis Major'] }, 'Tricep Pushdown (Cable)': { primary: ['Triceps'], secondary: [] }, 'Skull Crushers': { primary: ['Triceps'], secondary: [] },
    'Crunches': { primary: ['Rectus Abdominis'], secondary: [] }, 'Plank': { primary: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques'], secondary: ['Erector Spinae', 'Glutes'] }, 'Hanging Leg Raises': { primary: ['Rectus Abdominis (Lower)', 'Hip Flexors'], secondary: ['Obliques'] }, 'Russian Twists': { primary: ['Obliques'], secondary: ['Rectus Abdominis'] }, 'Ab Rollouts': { primary: ['Rectus Abdominis', 'Transverse Abdominis'], secondary: ['Latissimus Dorsi', 'Obliques'] },
    'Burpees': { primary: ['Quadriceps', 'Glutes', 'Pectoralis Major', 'Core'], secondary: ['Hamstrings', 'Calves', 'Shoulders', 'Triceps'] }, 'Kettlebell Swings': { primary: ['Glutes', 'Hamstrings'], secondary: ['Erector Spinae', 'Deltoids', 'Core'] }, 'Clean and Press': { primary: ['Quadriceps', 'Glutes', 'Deltoids'], secondary: ['Hamstrings', 'Erector Spinae', 'Trapezius', 'Triceps', 'Core'] },
};
const buildExerciseDatabase = (): Exercise[] => { const exerciseMap = new Map<string, Exercise>(); initialExerciseList.forEach(ex => { const muscleData = EXERCISE_MUSCLE_MAP[ex.name]; exerciseMap.set(ex.name, { ...ex, primaryMuscles: muscleData?.primary || [], secondaryMuscles: muscleData?.secondary || [], }); }); return Array.from(exerciseMap.values()); };
const NEW_EXERCISE_DB = buildExerciseDatabase();
const ROUTINES_DATA = [ { name: "Push/Pull/Legs (PPL)", description: "A popular split organizing workouts by movement pattern. Excellent for building balanced strength and muscle.", split: [ { day: "Push Day (Chest, Shoulders, Triceps)", exercises: ["Barbell Bench Press", "Overhead Press (Barbell)", "Incline Dumbbell Press", "Lateral Raises", "Tricep Pushdown (Cable)", "Pec Deck"] }, { day: "Pull Day (Back, Biceps)", exercises: ["Wide Grip Pull-Ups", "Bent Over Barbell Row", "Lat Pulldown", "Seated Cable Row", "Barbell Curl", "Hammer Curl"] }, { day: "Legs Day (Quads, Hamstrings, Glutes)", exercises: ["Barbell Back Squat", "Romanian Deadlifts", "Leg Press", "Leg Extension Machine", "Seated Leg Curl Machine", "Calf Raises"] } ] }, { name: "Upper/Lower Split", description: "Ideal for a 4-day-a-week routine, this split dedicates days to your upper and lower body for focused training and ample recovery.", split: [ { day: "Upper Body A", exercises: ["Barbell Bench Press", "Single-Arm Dumbbell Row", "Incline Dumbbell Press", "Lat Pulldown", "Lateral Raises", "Dumbbell Curl"] }, { day: "Lower Body A", exercises: ["Barbell Back Squat", "Seated Leg Curl Machine", "Walking Lunges", "Calf Raises", "Hanging Leg Raises"] }, { day: "Upper Body B", exercises: ["Overhead Press (Barbell)", "Wide Grip Pull-Ups", "Dumbbell Bench Press", "Seated Cable Row", "Face Pulls", "Tricep Pushdown (Cable)"] }, { day: "Lower Body B", exercises: ["Standard Deadlifts", "Leg Press", "Hip Thrusts", "Leg Extension Machine", "Plank"] } ] }, { name: "Full Body Routine", description: "A great routine for beginners or those with limited time, hitting all major muscle groups 3 times a week for comprehensive development.", split: [ { day: "Workout A", exercises: ["Barbell Back Squat", "Barbell Bench Press", "Bent Over Barbell Row", "Lateral Raises", "Crunches"] }, { day: "Workout B", exercises: ["Standard Deadlifts", "Overhead Press (Barbell)", "Wide Grip Pull-Ups", "Walking Lunges", "Plank"] }, { day: "Workout C", exercises: ["Leg Press", "Incline Dumbbell Bench Press", "Seated Cable Row", "Kettlebell Swings", "Hanging Leg Raises"] } ] } ];
type WorkoutFormData = Omit<Workout, 'id' | 'timestamp' | 'calories'>;

const CATEGORY_COLORS: { [key: string]: string } = {
    'Chest': '#ff6b6b', 'Back': '#48dbfb', 'Legs': '#1dd1a1', 'Shoulders': '#feca57', 'Arms': '#ff9f43',
    'Core': '#54a0ff', 'Full-Body': '#a3cb38', 'Cardio': '#5f27cd', 'Default': '#ced6e0'
};

const CategoryDistributionChart = ({ workouts, exerciseLibrary }: { workouts: Workout[], exerciseLibrary: Exercise[] }) => {
    const data = useMemo(() => {
        const categoryCounts: { [key: string]: number } = {};
        workouts.forEach(workout => {
            const category = workout.category || 'Default';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        const total = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
        if (total === 0) return [];
        
        return Object.entries(categoryCounts)
            .map(([name, count]) => ({ name, value: (count / total) * 100 }))
            .sort((a, b) => b.value - a.value);
    }, [workouts, exerciseLibrary]);

    const conicGradient = useMemo(() => {
        if (data.length === 0) return 'var(--surface)';
        let currentAngle = 0;
        const gradientParts = data.map(({ name, value }) => {
            const color = CATEGORY_COLORS[name] || CATEGORY_COLORS.Default;
            const startAngle = currentAngle;
            currentAngle += (value / 100) * 360;
            const endAngle = currentAngle;
            return `${color} ${startAngle}deg ${endAngle}deg`;
        });
        return `conic-gradient(${gradientParts.join(', ')})`;
    }, [data]);
    
    if (data.length === 0) {
        return <div style={styles.centeredMessage}><p>No workout data for the last 7 days.</p></div>
    }

    return (
        <div style={styles.doughnutContainer}>
            <div style={{...styles.doughnutChart, background: conicGradient }}>
                <div style={styles.doughnutInnerCircle}></div>
            </div>
            <div style={styles.legendContainer}>
                {data.map(({ name, value }) => (
                    <div key={name} style={styles.legendItem}>
                        <span style={{ ...styles.legendColorBox, backgroundColor: CATEGORY_COLORS[name] || CATEGORY_COLORS.Default }}></span>
                        <span style={styles.legendText}>{name} ({value.toFixed(1)}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TopFocusAreas = ({ workouts, exerciseLibrary }: { workouts: Workout[], exerciseLibrary: Exercise[] }) => {
    const data = useMemo(() => {
        const muscleCounts: { [key: string]: number } = {};
        workouts.forEach(workout => {
            const exercise = exerciseLibrary.find(e => e.name === workout.name);
            if (exercise) {
                exercise.primaryMuscles.forEach(muscle => {
                    muscleCounts[muscle] = (muscleCounts[muscle] || 0) + 1;
                });
            }
        });

        const sortedMuscles = Object.entries(muscleCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
            
        const maxCount = sortedMuscles.length > 0 ? sortedMuscles[0][1] : 1;

        return sortedMuscles.map(([name, count]) => ({
            name,
            count,
            percentage: (count / maxCount) * 100,
        }));

    }, [workouts, exerciseLibrary]);

    if (data.length === 0) {
        return null; // Don't render if no data
    }
    
    return (
        <div style={{...styles.card, ...styles.focusCard}}>
             <h2 style={styles.cardTitle}>Top Focus Areas</h2>
             <div style={styles.focusContainer}>
                {data.map(muscle => (
                    <div key={muscle.name} style={styles.focusItem}>
                        <span style={styles.focusName}>{muscle.name}</span>
                        <div style={styles.focusBarBackground}>
                            <div style={{...styles.focusBar, width: `${muscle.percentage}%`}}></div>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    );
};


const StatsPage = ({ workouts, exerciseLibrary }: { workouts: Workout[], exerciseLibrary: Exercise[] }) => {
    const filteredWorkouts = useMemo(() => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setHours(0, 0, 0, 0);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        return workouts.filter(w => new Date(w.date) >= sevenDaysAgo);
    }, [workouts]);
    
    return (
        <div style={styles.statsPage}>
            <header style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>Your Weekly Stats</h1>
                <p style={styles.pageSubtitle}>Activity from the last 7 days</p>
            </header>
            
            <div style={styles.statsGrid}>
                <div style={{...styles.card, ...styles.chartCard}}>
                    <h2 style={styles.cardTitle}>Category Distribution</h2>
                    <CategoryDistributionChart workouts={filteredWorkouts} exerciseLibrary={exerciseLibrary} />
                </div>
            </div>
            
            <TopFocusAreas workouts={filteredWorkouts} exerciseLibrary={exerciseLibrary} />
        </div>
    );
};

const App = () => {
    const [workouts, setWorkouts] = useState<Workout[]>(() => {
        try {
            const saved = localStorage.getItem('workouts');
            const parsedWorkouts: any[] = saved ? JSON.parse(saved) : [];
            
            // Simple one-time migration for old data without a category property
            const migratedWorkouts = parsedWorkouts.map(w => {
                if (w && typeof w.category !== 'string') {
                    const exerciseDetails = NEW_EXERCISE_DB.find(ex => ex.name === w.name);
                    return { ...w, category: exerciseDetails?.category || 'Default' };
                }
                return w;
            });

            return migratedWorkouts;
        } catch (e) {
            return [];
        }
    });

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
    
    const [activeTab, setActiveTab] = useState('summary');
    const [exerciseToLog, setExerciseToLog] = useState<Exercise | null>(null);

    useEffect(() => { localStorage.setItem('workouts', JSON.stringify(workouts)); }, [workouts]);
    useEffect(() => { localStorage.setItem('exerciseLibrary', JSON.stringify(exerciseLibrary)); }, [exerciseLibrary]);

    const calculateCalories = ({ type, duration, sets }: { type: string, duration?: number, sets?: Partial<SetData>[] }) => {
        if (type === 'Cardio') return Math.round((duration || 0) * 8.5);
        if (!sets) return 0;
        const totalVolume = sets.reduce((acc, set) => acc + ( (set.weight || 0) * (set.reps || 0) ), 0);
        return Math.round(totalVolume * 0.15);
    };

    const addWorkout = (workout: WorkoutFormData) => {
        const newWorkout: Workout = { id: Date.now(), timestamp: new Date(`${workout.date}T${new Date().toTimeString().split(' ')[0]}`).toISOString(), ...workout, calories: calculateCalories(workout) };
        setWorkouts(prev => [...prev, newWorkout]);
    };

    const handleUpdateWorkout = (updatedWorkoutData: Workout) => {
        const updatedWorkout = { ...updatedWorkoutData, calories: calculateCalories(updatedWorkoutData) };
        setWorkouts(prev => prev.map(w => w.id === updatedWorkout.id ? updatedWorkout : w));
    };

    const handleDeleteWorkout = (workoutId: number) => {
        setWorkouts(prev => prev.filter(w => w.id !== workoutId));
    };
    
    const clearExerciseToLog = useCallback(() => {
        setExerciseToLog(null);
    }, []);

    const handleAddExerciseFromLibrary = (exercise: Exercise) => { 
        setExerciseToLog(exercise);
        setActiveTab('summary');
    };

    const handleAddCustomExercise = (newExercise: Exercise) => setExerciseLibrary(prev => [...prev, newExercise]);

    const handleStartRoutine = (routine: typeof ROUTINES_DATA[0]) => {
        const today = new Date().toISOString().split('T')[0];
        const routineWorkouts: WorkoutFormData[] = routine.split.flatMap(day => 
            day.exercises.map((exName): WorkoutFormData | null => {
                const exercise = exerciseLibrary.find(e => e.name === exName);
                if (!exercise) return null;
                return {
                    name: exName,
                    type: exercise.type,
                    category: exercise.category,
                    date: today,
                    sets: exercise.type === 'Strength' ? [{ weight: 0, reps: 0 }, { weight: 0, reps: 0 }, { weight: 0, reps: 0 }] : undefined,
                    duration: exercise.type === 'Cardio' ? 30 : undefined,
                };
            })
        ).filter((w): w is WorkoutFormData => w !== null);

        routineWorkouts.forEach(addWorkout);
        setActiveTab('summary');
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'stats':
                return <StatsPage workouts={workouts} exerciseLibrary={exerciseLibrary} />;
            case 'library':
                return <LibraryPage 
                    exerciseLibrary={exerciseLibrary} 
                    onAddExercise={handleAddExerciseFromLibrary} 
                    onAddCustomExercise={handleAddCustomExercise}
                    routines={ROUTINES_DATA}
                    onStartRoutine={handleStartRoutine}
                />;
            case 'summary':
            default:
                return (
                    <SummaryPage
                        workouts={workouts}
                        addWorkout={addWorkout}
                        handleUpdateWorkout={handleUpdateWorkout}
                        handleDeleteWorkout={handleDeleteWorkout}
                        exerciseLibrary={exerciseLibrary}
                        exerciseToLog={exerciseToLog}
                        clearExerciseToLog={clearExerciseToLog}
                    />
                );
        }
    };
    
    return (
        <div style={styles.appContainer}>
            <main style={styles.mainContent}>{renderContent()}</main>
            <footer style={styles.footer}>
                <div style={styles.footerNav}>
                    <button onClick={() => setActiveTab('summary')} style={{...styles.footerButton, ...(activeTab === 'summary' ? styles.activeFooterButton : {})}}>
                        <SummaryIcon style={{...styles.footerIcon, ...(activeTab === 'summary' ? styles.activeFooterIcon : {})}} />
                    </button>
                    <button onClick={() => setActiveTab('stats')} style={{...styles.footerButton, ...(activeTab === 'stats' ? styles.activeFooterButton : {})}}>
                        <StatsIcon style={{...styles.footerIcon, ...(activeTab === 'stats' ? styles.activeFooterIcon : {})}} />
                    </button>
                    <button onClick={() => setActiveTab('library')} style={{...styles.footerButton, ...(activeTab === 'library' ? styles.activeFooterButton : {})}}>
                        <LibraryIcon style={{...styles.footerIcon, ...(activeTab === 'library' ? styles.activeFooterIcon : {})}} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

const Header = () => (
    <header style={styles.appHeader}>
        <h1 style={styles.appName}>Gymbrootan</h1>
    </header>
);

const SummaryPage = ({ workouts, addWorkout, handleUpdateWorkout, handleDeleteWorkout, exerciseLibrary, exerciseToLog, clearExerciseToLog }: { workouts: Workout[], addWorkout: (w: WorkoutFormData) => void, handleUpdateWorkout: (w: Workout) => void, handleDeleteWorkout: (id: number) => void, exerciseLibrary: Exercise[], exerciseToLog: Exercise | null, clearExerciseToLog: () => void }) => {
    const [historyVisible, setHistoryVisible] = useState(false);
    const [detailWorkout, setDetailWorkout] = useState<Workout | null>(null);
    const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
    const [swipedWorkoutId, setSwipedWorkoutId] = useState<number | null>(null);
    
    const todayISO = new Date().toISOString().split('T')[0];

    const { todayWorkouts, pastWorkoutsByDate } = useMemo(() => {
        const today: Workout[] = [];
        const past: Record<string, Workout[]> = {};

        workouts.forEach(workout => {
            if (workout.date === todayISO) {
                today.push(workout);
            } else {
                if (!past[workout.date]) {
                    past[workout.date] = [];
                }
                past[workout.date].push(workout);
            }
        });
        
        today.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        const pastWorkoutsByDate = Object.entries(past)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime());
        
        pastWorkoutsByDate.forEach(([_, workoutsOnDate]) => {
            workoutsOnDate.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        });

        return { todayWorkouts: today, pastWorkoutsByDate };
    }, [workouts, todayISO]);


    const handleEdit = (workout: Workout) => {
        setDetailWorkout(null);
        setEditingWorkout(workout);
    };
    
    const handleSwipe = (id: number) => {
        setSwipedWorkoutId(prevId => (prevId === id ? null : id));
    };

    const enhancedDeleteWorkout = (id: number) => {
        handleDeleteWorkout(id);
        setSwipedWorkoutId(null);
    };

    return (
        <div style={styles.summaryContainer} onClick={() => swipedWorkoutId && setSwipedWorkoutId(null)}>
            <Header />

            <div style={styles.stickyFormContainer}>
                <div style={styles.formCard}>
                     <h2 style={styles.cardTitle}>Log Workout</h2>
                     <WorkoutForm
                        workouts={workouts}
                        addWorkout={addWorkout}
                        exerciseLibrary={exerciseLibrary}
                        exerciseToLog={exerciseToLog}
                        clearExerciseToLog={clearExerciseToLog}
                    />
                </div>
            </div>

            <div style={styles.card}>
                <h2 style={styles.cardTitle}>Today's Workout ({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</h2>
                <div style={styles.todayWorkoutList}>
                    {todayWorkouts.length > 0 ? (
                        todayWorkouts
                            .map(w => <WorkoutCard 
                                key={w.id} 
                                workout={w} 
                                onEdit={() => setDetailWorkout(w)}
                                isSwiped={w.id === swipedWorkoutId}
                                onSwipe={() => handleSwipe(w.id)}
                                onDelete={() => enhancedDeleteWorkout(w.id)}
                            />)
                    ) : (
                        <div style={styles.placeholder}>
                            <p>No workouts logged for today. Add one above or start a routine from the library.</p>
                        </div>
                    )}
                </div>
            </div>

            <div style={styles.card}>
                 <h2 style={styles.cardTitle}>Logbook</h2>
                {pastWorkoutsByDate.length > 0 ? (
                    historyVisible ? (
                        <>
                            <div style={styles.scrollableWorkoutList}>
                            {pastWorkoutsByDate.map(([date, workoutsOnDate]) => {
                                const d = new Date(date + 'T00:00:00');
                                const dateString = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                                return (
                                <div key={date} style={styles.historyDayGroup}>
                                    <h3 style={styles.historyDateHeader}>{dateString}</h3>
                                    <div style={styles.historyDayWorkouts}>
                                        {workoutsOnDate.map(w => <WorkoutCard key={w.id} workout={w} onEdit={() => setDetailWorkout(w)} />)}
                                    </div>
                                </div>
                            )})}
                            </div>
                            <button style={styles.historyButton} onClick={() => setHistoryVisible(false)}>Hide History</button>
                        </>
                    ) : (
                        <button style={styles.historyButton} onClick={() => setHistoryVisible(true)}>View Full History</button>
                    )
                ) : (
                    <div style={styles.placeholder}>
                        <p>Log your first workout to see your history.</p>
                    </div>
                )}
            </div>
            
            {detailWorkout && (
                <WorkoutDetailModal
                    workout={detailWorkout}
                    allWorkouts={workouts}
                    onClose={() => setDetailWorkout(null)}
                    onEdit={() => handleEdit(detailWorkout)}
                    onDelete={() => {
                        enhancedDeleteWorkout(detailWorkout.id);
                        setDetailWorkout(null);
                    }}
                />
            )}
            {editingWorkout && (
                <EditWorkoutModal
                    workout={editingWorkout}
                    onClose={() => setEditingWorkout(null)}
                    onSave={(w) => {
                        handleUpdateWorkout(w);
                        setEditingWorkout(null);
                    }}
                    onDelete={(id) => {
                        enhancedDeleteWorkout(id);
                        setEditingWorkout(null);
                    }}
                />
            )}
        </div>
    );
};

const WorkoutCard = ({ workout, onEdit, isSwiped, onSwipe, onDelete }: { workout: Workout, onEdit: () => void, isSwiped?: boolean, onSwipe?: () => void, onDelete?: () => void }) => {
    const touchStartX = useRef(0);
    
    const handleTouchStart = (onSwipe && onDelete) ? (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    } : undefined;

    const handleTouchEnd = (onSwipe && onDelete) ? (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchStartX.current - touchEndX;
        if (swipeDistance > 50 || swipeDistance < -50) { // Swipe left or right
            onSwipe();
        }
    } : undefined;

    const handleClick = (e: React.MouseEvent) => {
        if (isSwiped) {
            e.stopPropagation();
            return;
        }
        onEdit();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(onDelete) onDelete();
    };
    
    const totalVolume = workout.type === 'Strength' ? workout.sets?.reduce((acc, set) => acc + (set.weight * set.reps), 0) : 0;
    
    const cardContent = (
        <>
            <ExerciseIcon category={workout.category} style={{}} />
            <div style={styles.workoutInfo}>
                <p style={styles.workoutName}>{workout.name}</p>
                {workout.type === 'Strength' ? (
                    <p style={styles.workoutDetails}>{workout.sets?.length} sets &bull; {totalVolume} kg total</p>
                ) : (
                    <p style={styles.workoutDetails}>{workout.duration} min</p>
                )}
            </div>
            <div style={styles.workoutCalories}>
                ~{workout.calories} kcal
            </div>
        </>
    );

    if (onSwipe && onDelete) {
        return (
            <div style={styles.workoutCardContainer}>
                <div onClick={handleDeleteClick} style={styles.swipeDeleteAction}>
                    <span>Delete</span>
                </div>
                <div 
                    style={{
                        ...styles.workoutCard,
                        ...styles.workoutCardContent, 
                        transform: isSwiped ? 'translateX(-80px)' : 'translateX(0)'
                    }}
                    onClick={handleClick}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {cardContent}
                </div>
            </div>
        );
    }
    
    return (
        <div style={styles.workoutCard} onClick={handleClick}>
            {cardContent}
        </div>
    );
};


const WorkoutForm = ({ workouts, addWorkout, exerciseLibrary, exerciseToLog, clearExerciseToLog }: { workouts: Workout[], addWorkout: (w: WorkoutFormData) => void, exerciseLibrary: Exercise[], exerciseToLog: Exercise | null, clearExerciseToLog: () => void }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<'Strength' | 'Cardio'>('Strength');
    const [sets, setSets] = useState<Partial<SetData>[]>([{ weight: undefined, reps: undefined }]);
    const [duration, setDuration] = useState<number | undefined>(30);
    const [suggestions, setSuggestions] = useState<Exercise[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const populateWithPreviousData = (exercise: Exercise) => {
        const lastWorkout = workouts
            .filter(w => w.name === exercise.name)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

        setType(exercise.type);
        if (exercise.type === 'Strength') {
            setSets(lastWorkout?.sets?.length ? lastWorkout.sets.map(s => ({...s})) : [{ weight: 0, reps: 0 }]);
            setDuration(undefined);
        } else {
            setSets([]);
            setDuration(lastWorkout?.duration || 30);
        }
    };

    useEffect(() => {
        if (exerciseToLog) {
            setName(exerciseToLog.name);
            populateWithPreviousData(exerciseToLog);
            setSuggestions([]);
            setIsFocused(false);
            clearExerciseToLog();
            inputRef.current?.focus();
        }
    }, [exerciseToLog, clearExerciseToLog, workouts]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (value.length > 1) {
            setSuggestions(
                exerciseLibrary.filter(ex => ex.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (exercise: Exercise) => {
        setName(exercise.name);
        setSuggestions([]);
        populateWithPreviousData(exercise);
        setIsFocused(false);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
             setIsFocused(false);
        }, 200); // delay to allow click on suggestion
        const exercise = exerciseLibrary.find(e => e.name.toLowerCase() === name.toLowerCase());
        if (exercise) {
            populateWithPreviousData(exercise);
        }
    };

    const handleSetChange = (index: number, field: 'weight' | 'reps', value: string) => {
        const newSets = [...sets];
        const numValue = parseInt(value, 10);
        newSets[index] = { ...newSets[index], [field]: isNaN(numValue) ? undefined : numValue };
        setSets(newSets);
    };

    const addSet = () => {
        const lastSet = sets.length > 0 ? sets[sets.length - 1] : { weight: undefined, reps: undefined };
        setSets([...sets, { ...lastSet }]);
    };
    const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const exercise = exerciseLibrary.find(ex => ex.name === name);
        if (!exercise) { alert("Please select a valid exercise from the library."); return; }
        
        const finalWorkout: WorkoutFormData = {
            name,
            type,
            date: date,
            category: exercise.category,
            ...(type === 'Strength'
                ? { sets: sets.map(s => ({ weight: s.weight || 0, reps: s.reps || 0 })).filter(s => s.reps > 0) }
                : { duration: duration || 0 }),
        };
        addWorkout(finalWorkout);
        setName('');
        setType('Strength');
        setSets([{ weight: undefined, reps: undefined }]);
        setDuration(30);
    };
    
    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={{ display: 'flex', gap: '16px' }}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{...styles.input, flex: 1}} />
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Exercise Name"
                    value={name}
                    onChange={handleNameChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleInputBlur}
                    style={{...styles.input, width: '100%'}}
                    required
                />
                {isFocused && suggestions.length > 0 && (
                    <div style={styles.suggestionsList}>
                        {suggestions.map(s => (
                            <div key={s.name} style={styles.suggestionItem} onMouseDown={() => handleSelectSuggestion(s)}>
                                <ExerciseIcon category={s.category} style={{}} />
                                <span style={styles.suggestionText}>{s.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {name && type === 'Strength' && (
                <div style={styles.setsContainer}>
                    {sets.map((set, index) => (
                        <div key={index} style={styles.setRow}>
                            <span style={styles.setLabel}>Set {index + 1}</span>
                            <input type="number" placeholder="Weight (kg)" value={set.weight || ''} onChange={e => handleSetChange(index, 'weight', e.target.value)} style={styles.input} />
                            <input type="number" placeholder="Reps" value={set.reps || ''} onChange={e => handleSetChange(index, 'reps', e.target.value)} style={styles.input} />
                            <button type="button" onClick={() => removeSet(index)} style={styles.removeSetButton} aria-label={`Remove Set ${index + 1}`}>&times;</button>
                        </div>
                    ))}
                    <button type="button" onClick={addSet} style={styles.addSetButton}>+ Add Set</button>
                </div>
            )}

            {name && type === 'Cardio' && (
                <div style={styles.setRow}>
                    <span style={styles.setLabel}>Duration</span>
                    <input type="number" placeholder="minutes" value={duration || ''} onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        setDuration(isNaN(val) ? undefined : val);
                    }} style={styles.input} />
                </div>
            )}

            {name && <button type="submit" style={styles.submitButton}>Add Workout</button>}
        </form>
    );
};

const EditWorkoutModal = ({ workout, onClose, onSave, onDelete }: { workout: Workout, onClose: () => void, onSave: (w: Workout) => void, onDelete: (id: number) => void }) => {
    const [editedWorkout, setEditedWorkout] = useState<Workout>(workout);

    const handleSetChange = (index: number, field: 'weight' | 'reps', value: string) => {
        if (editedWorkout.type !== 'Strength' || !editedWorkout.sets) return;
        const newSets = [...editedWorkout.sets];
        newSets[index] = { ...newSets[index], [field]: parseInt(value, 10) || 0 };
        setEditedWorkout(w => ({ ...w!, sets: newSets }));
    };
    
    const addSet = () => {
         if (editedWorkout.type !== 'Strength') return;
         const newSets = [...(editedWorkout.sets || []), { weight: 0, reps: 0 }];
         setEditedWorkout(w => ({ ...w!, sets: newSets }));
    }
    
    const removeSet = (index: number) => {
        if (editedWorkout.type !== 'Strength' || !editedWorkout.sets) return;
        const newSets = editedWorkout.sets.filter((_, i) => i !== index);
        setEditedWorkout(w => ({ ...w!, sets: newSets }));
    }

    const handleDurationChange = (value: string) => {
        if (editedWorkout.type !== 'Cardio') return;
        setEditedWorkout(w => ({ ...w!, duration: parseInt(value, 10) || 0 }));
    };
    
    return (
        <div style={styles.modalBackdrop} onClick={onClose}>
            <div style={{...styles.modalContent, animation: 'scaleIn 0.3s ease-out forwards'}} onClick={e => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Edit {workout.name}</h3>
                <div style={styles.setsContainer}>
                    {editedWorkout.type === 'Strength' && editedWorkout.sets?.map((set, index) => (
                        <div key={index} style={styles.setRow}>
                            <span style={styles.setLabel}>Set {index + 1}</span>
                            <input type="number" placeholder="kg" value={set.weight} onChange={e => handleSetChange(index, 'weight', e.target.value)} style={styles.input} />
                            <input type="number" placeholder="reps" value={set.reps} onChange={e => handleSetChange(index, 'reps', e.target.value)} style={styles.input} />
                            <button type="button" onClick={() => removeSet(index)} style={styles.removeSetButton} aria-label={`Remove Set ${index + 1}`}>&times;</button>
                        </div>
                    ))}
                    {editedWorkout.type === 'Strength' && (
                        <button type="button" onClick={addSet} style={styles.addSetButton}>Add Set</button>
                    )}
                </div>
                {editedWorkout.type === 'Cardio' && (
                     <div style={styles.setRow}>
                        <span style={styles.setLabel}>Duration</span>
                        <input type="number" placeholder="minutes" value={editedWorkout.duration || ''} onChange={e => handleDurationChange(e.target.value)} style={styles.input} />
                    </div>
                )}
                <div style={styles.modalActions}>
                    <button onClick={() => onDelete(workout.id)} style={{...styles.modalButton, ...styles.deleteButton}}>Delete</button>
                    <button onClick={() => onSave(editedWorkout)} style={{...styles.modalButton, ...styles.saveButton}}>Save</button>
                </div>
            </div>
        </div>
    );
};

const WorkoutDetailModal = ({ workout, allWorkouts, onClose, onEdit, onDelete }: { workout: Workout; allWorkouts: Workout[]; onClose: () => void; onEdit: () => void; onDelete: () => void; }) => {
    return (
        <div style={styles.modalBackdrop} onClick={onClose}>
            <div style={{ ...styles.modalContent, ...styles.detailModalContent, animation: 'scaleIn 0.3s ease-out forwards' }} onClick={e => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>{workout.name}</h3>
                <p style={styles.modalSubtitle}>{new Date(workout.timestamp).toLocaleString()}</p>
                <div style={styles.workoutDetailSection}>
                    <h4>Progress Chart (Last 15 Sessions)</h4>
                    <ExerciseProgressChart exerciseName={workout.name} allWorkouts={allWorkouts} />
                </div>
                <div style={styles.workoutDetailSection}>
                    <h4>Session Details</h4>
                    {workout.type === 'Strength' && workout.sets?.map((set, i) => (
                        <p key={i} style={styles.detailText}>Set {i+1}: {set.weight} kg x {set.reps} reps</p>
                    ))}
                    {workout.type === 'Cardio' && (
                        <p style={styles.detailText}>Duration: {workout.duration} minutes</p>
                    )}
                     <p style={styles.detailText}>Calories Burned: ~{workout.calories} kcal</p>
                </div>
                <div style={styles.modalActions}>
                    <button onClick={onDelete} style={{...styles.modalButton, ...styles.deleteButton}}>Delete</button>
                    <button onClick={onEdit} style={{...styles.modalButton, ...styles.saveButton}}>Edit</button>
                </div>
            </div>
        </div>
    );
};

const ExerciseProgressChart = ({ exerciseName, allWorkouts }: { exerciseName: string, allWorkouts: Workout[] }) => {
    const chartData = useMemo(() => {
        const exerciseHistory = allWorkouts
            .filter(w => w.name === exerciseName && (w.type === 'Cardio' || (w.sets && w.sets.length > 0)))
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
            .slice(-15);

        return exerciseHistory.map(workout => {
            let value = 0;
            if (workout.type === 'Strength' && workout.sets && workout.sets.length > 0) {
                value = Math.max(...workout.sets.map(s => s.weight));
            } else if (workout.type === 'Cardio' && workout.duration) {
                value = workout.duration;
            }
            return { date: workout.date, value, type: workout.type };
        });
    }, [exerciseName, allWorkouts]);

    if (chartData.length < 2) {
        return <div style={styles.centeredMessage}><p>Log this exercise at least twice to see progress.</p></div>;
    }

    const PADDING = 40;
    const WIDTH = 250;
    const HEIGHT = 130;
    const VIEW_WIDTH = WIDTH + PADDING + 10;
    const VIEW_HEIGHT = HEIGHT + PADDING * 1.5;

    const maxVal = Math.max(...chartData.map(d => d.value), 0);
    const minVal = 0;
    
    const getX = (index: number) => PADDING + (chartData.length > 1 ? (index / (chartData.length - 1)) * WIDTH : WIDTH / 2);
    const getY = (value: number) => PADDING + HEIGHT - ((value - minVal) / (maxVal === minVal ? 1 : maxVal - minVal)) * HEIGHT;

    const linePath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`).join(' ');
    
    const yAxisLabels = Array.from(new Set([maxVal, maxVal/2, minVal])).map(val => ({
        value: val.toFixed(0),
        y: getY(val)
    }));
    
    const formatDate = (dateStr: string) => new Date(dateStr + 'T00:00:00').toLocaleDateString('en-us', {month: 'short', day: 'numeric'});

    return (
        <div style={styles.progressChartContainer}>
            <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} style={{width: '100%', height: 'auto'}}>
                <line x1={PADDING} y1={PADDING + HEIGHT} x2={PADDING + WIDTH} y2={PADDING + HEIGHT} style={styles.chartAxis} />
                
                {yAxisLabels.map(label => (
                    <g key={`y-label-${label.value}`}>
                        <text x={PADDING - 8} y={label.y + 4} style={styles.chartLabel} textAnchor="end">{label.value}</text>
                        <line x1={PADDING} y1={label.y} x2={PADDING+WIDTH} y2={label.y} style={styles.chartGridLine}/>
                    </g>
                ))}

                <path d={linePath} style={styles.progressLine} />
                {chartData.map((d, i) => (
                    <g key={i}>
                        <circle cx={getX(i)} cy={getY(d.value)} r="3.5" style={styles.progressPoint} />
                        <title>{`${formatDate(d.date)}: ${d.value}${d.value > 0 ? (d.type === 'Strength' ? "kg" : "min") : ""}`}</title>
                    </g>
                ))}
                 <text x={PADDING} y={PADDING + HEIGHT + 20} style={styles.chartLabel} textAnchor="start">{formatDate(chartData[0].date)}</text>
                 <text x={PADDING + WIDTH} y={PADDING + HEIGHT + 20} style={styles.chartLabel} textAnchor="end">{formatDate(chartData[chartData.length - 1].date)}</text>
            </svg>
        </div>
    );
};

const LibraryPage = ({ exerciseLibrary, onAddExercise, onAddCustomExercise, routines, onStartRoutine }: { exerciseLibrary: Exercise[], onAddExercise: (e: Exercise) => void, onAddCustomExercise: (e: Exercise) => void, routines: typeof ROUTINES_DATA, onStartRoutine: (r: typeof ROUTINES_DATA[0]) => void }) => {
    const [activeTab, setActiveTab] = useState('exercises'); // 'exercises' or 'routines'
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const filteredExercisesByCategory = useMemo(() => {
        return exerciseLibrary
            .filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .reduce((acc, ex) => {
                if (!acc[ex.category]) {
                    acc[ex.category] = [];
                }
                acc[ex.category].push(ex);
                return acc;
            }, {} as Record<string, Exercise[]>);
    }, [exerciseLibrary, searchTerm]);

    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleAddCustom = (newExercise: Exercise) => {
        onAddCustomExercise(newExercise);
        setShowAddForm(false);
    };

    return (
        <div style={styles.libraryPage}>
            <header style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>Library</h1>
                <p style={styles.pageSubtitle}>Browse exercises and pre-made routines</p>
            </header>

            <div style={styles.libraryTabs}>
                <button 
                    style={{...styles.libraryTab, ...(activeTab === 'exercises' ? styles.activeLibraryTab : {})}} 
                    onClick={() => setActiveTab('exercises')}>
                    Exercises
                </button>
                <button 
                    style={{...styles.libraryTab, ...(activeTab === 'routines' ? styles.activeLibraryTab : {})}} 
                    onClick={() => setActiveTab('routines')}>
                    Routines
                </button>
            </div>
            
            <div style={{animation: 'fadeInUp 0.5s ease-out forwards'}}>
                {activeTab === 'exercises' && (
                    <div>
                        <div style={styles.libraryActions}>
                             <input
                                type="text"
                                placeholder="Search exercises..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{ ...styles.input, width: '100%' }}
                            />
                            <button style={styles.addExerciseButton} onClick={() => setShowAddForm(s => !s)}>
                                {showAddForm ? 'Cancel' : '+ Add'}
                            </button>
                        </div>
                       
                        {showAddForm && <AddCustomExerciseForm onAdd={handleAddCustom} />}
                        
                        {Object.entries(filteredExercisesByCategory).sort(([catA], [catB]) => catA.localeCompare(catB)).map(([category, exercises]) => (
                            <div key={category} style={styles.categoryGroup}>
                                <div style={styles.categoryTitleHeader} onClick={() => toggleCategory(category)}>
                                    <h2 style={styles.categoryTitle}>{category}</h2>
                                    <ChevronIcon style={styles.chevronIcon} isExpanded={!!expandedCategories[category]} />
                                </div>
                                {expandedCategories[category] && (
                                    <div style={styles.exerciseList}>
                                        {exercises.map(ex => (
                                            <div key={ex.name} style={styles.exerciseListItem} onClick={() => onAddExercise(ex)} title={`Log ${ex.name}`}>
                                                <ExerciseIcon category={ex.category} style={{flexShrink: 0}}/>
                                                <div style={styles.exerciseInfo}>
                                                    <p style={styles.exerciseName}>{ex.name}</p>
                                                    <p style={styles.exerciseMuscles}>
                                                        {ex.primaryMuscles.join(', ')}
                                                    </p>
                                                </div>
                                                <span style={styles.addIcon}>+</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'routines' && (
                    <div style={styles.routinesList}>
                        {routines.map(routine => (
                            <div key={routine.name} style={styles.routineCard}>
                                <h3 style={styles.routineTitle}>{routine.name}</h3>
                                <p style={styles.routineDescription}>{routine.description}</p>
                                <div style={styles.routineSplit}>
                                    {routine.split.map(day => (
                                        <div key={day.day} style={styles.routineDay}>
                                            <strong>{day.day}</strong>
                                            <ul style={styles.routineExerciseList}>
                                                {day.exercises.slice(0, 3).map(ex => <li key={ex}>{ex}</li>)}
                                                {day.exercises.length > 3 && <li>...and more</li>}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <button style={styles.startRoutineButton} onClick={() => onStartRoutine(routine)}>
                                    Start This Routine
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const AddCustomExerciseForm = ({ onAdd }: { onAdd: (ex: Exercise) => void }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<'Strength' | 'Cardio'>('Strength');
    const [category, setCategory] = useState('Chest');
    const [primary, setPrimary] = useState('');
    const [secondary, setSecondary] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !category) {
            alert('Name and category are required.');
            return;
        }
        onAdd({
            name,
            type,
            category,
            primaryMuscles: primary.split(',').map(s => s.trim()).filter(Boolean),
            secondaryMuscles: secondary.split(',').map(s => s.trim()).filter(Boolean),
        });
        setName('');
        setPrimary('');
        setSecondary('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.addCustomForm}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Exercise Name" style={styles.input} required />
            <select value={type} onChange={e => setType(e.target.value as any)} style={styles.input}>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
            </select>
            <select value={category} onChange={e => setCategory(e.target.value)} style={styles.input}>
                {Object.keys(CATEGORY_COLORS).filter(c => c !== 'Default').map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="text" value={primary} onChange={e => setPrimary(e.target.value)} placeholder="Primary Muscles (comma-separated)" style={styles.input} />
            <input type="text" value={secondary} onChange={e => setSecondary(e.target.value)} placeholder="Secondary Muscles (comma-separated)" style={styles.input} />
            <button type="submit" style={styles.submitButton}>Add Exercise</button>
        </form>
    );
};


const styles: { [key: string]: React.CSSProperties } = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    mainContent: {
        flex: 1,
        paddingBottom: '70px', // Footer height
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(28, 28, 30, 0.8)',
        backdropFilter: 'blur(15px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 50,
        height: '60px',
    },
    footerNav: {
        display: 'flex',
        justifyContent: 'space-around',
        height: '100%',
    },
    footerButton: {
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0px',
        padding: '0 12px',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        flex: 1,
        height: '100%',
    },
    activeFooterButton: {
        color: 'var(--primary-accent)',
    },
    footerIcon: {
        width: '28px',
        height: '28px',
    },
    activeFooterIcon: {
        color: 'var(--primary-accent)',
    },
    appHeader: {
        padding: '8px 16px',
        textAlign: 'center',
    },
    appName: {
        fontSize: '28px',
        fontWeight: 800,
        margin: 0,
        background: 'linear-gradient(90deg, var(--primary-accent), var(--secondary-accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    summaryContainer: {
        padding: '0 16px',
        animation: 'fadeInUp 0.5s ease-out forwards',
    },
    stickyFormContainer: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '16px 0',
        background: 'radial-gradient(circle at top, rgba(42, 42, 46, 0.6) 0%, rgba(17, 17, 17, 0.6) 70%)',
        backdropFilter: 'blur(15px)',
        margin: '0 -16px',
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    formCard: {
        background: 'var(--surface)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid var(--border-color)',
    },
    card: {
        background: 'var(--surface)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '16px',
        border: '1px solid var(--border-color)',
    },
    cardTitle: {
        marginTop: 0,
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: 600,
    },
    todayWorkoutList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    placeholder: {
        textAlign: 'center',
        padding: '24px',
        color: 'var(--text-secondary)',
        fontSize: '14px',
    },
    scrollableWorkoutList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxHeight: '450px',
        overflowY: 'auto',
        paddingRight: '8px',
    },
    historyDayGroup: {
        
    },
    historyDateHeader: {
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '8px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--border-color)',
    },
    historyDayWorkouts: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    historyButton: {
        width: '100%',
        padding: '12px',
        background: 'var(--button-bg)',
        border: 'none',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '16px',
    },
    workoutCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        background: 'var(--button-bg)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    workoutCardContainer: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
    },
    workoutCardContent: {
        transition: 'transform 0.3s ease',
        backgroundColor: 'var(--button-bg)',
        zIndex: 1,
        position: 'relative',
    },
    swipeDeleteAction: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '80px',
        backgroundColor: '#ff3b30',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        cursor: 'pointer',
        borderRadius: '12px'
    },
    libraryIconContainer: {
        width: '44px',
        height: '44px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a3a3c',
        flexShrink: 0,
    },
    libraryIcon: {
        width: '28px',
        height: '28px',
        color: 'var(--primary-accent)',
    },
    workoutInfo: {
        flex: 1,
    },
    workoutName: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 600,
    },
    workoutDetails: {
        margin: 0,
        fontSize: '14px',
        color: 'var(--text-secondary)',
    },
    workoutCalories: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--primary-accent)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    input: {
        width: '100%',
        padding: '12px',
        background: 'var(--button-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    suggestionsList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#2c2c2e',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        marginTop: '4px',
        zIndex: 100,
        maxHeight: '200px',
        overflowY: 'auto',
    },
    suggestionItem: {
        padding: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    suggestionText: {
        fontSize: '16px',
    },
    setsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    setRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    setLabel: {
        fontSize: '14px',
        width: '50px',
        color: 'var(--text-secondary)',
    },
    removeSetButton: {
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '0 8px',
    },
    addSetButton: {
        padding: '8px',
        background: 'var(--button-bg)',
        border: '1px dashed var(--border-color)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontWeight: 600,
        cursor: 'pointer',
    },
    submitButton: {
        padding: '14px',
        background: 'linear-gradient(90deg, var(--primary-accent), var(--secondary-accent))',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
    },
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
    },
    modalContent: {
        background: 'var(--surface)',
        padding: '16px',
        borderRadius: '16px',
        width: 'calc(100% - 32px)',
        maxWidth: '350px',
        border: '1px solid var(--border-color)',
    },
    modalTitle: {
        marginTop: 0,
        fontSize: '20px',
    },
    modalSubtitle: {
        marginTop: '-12px',
        marginBottom: '16px',
        color: 'var(--text-secondary)',
        fontSize: '14px'
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        marginTop: '20px',
    },
    modalButton: {
        flex: 1,
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    deleteButton: {
        background: 'var(--button-bg)',
        color: '#ff453a',
    },
    saveButton: {
        background: 'var(--primary-accent)',
        color: 'white',
    },
    detailModalContent: {},
    workoutDetailSection: {
        marginTop: '16px',
    },
    detailText: {
        margin: '4px 0',
        fontSize: '16px',
        color: 'var(--text-secondary)',
    },
    progressChartContainer: {
        marginTop: '8px',
        marginLeft: '-15px'
    },
    chartAxis: {
        stroke: 'var(--border-color)',
        strokeWidth: 1,
    },
    chartGridLine: {
        stroke: 'var(--border-color)',
        strokeWidth: 1,
        strokeDasharray: '2, 3',
    },
    chartLabel: {
        fontSize: '10px',
        fill: 'var(--text-secondary)',
    },
    progressLine: {
        stroke: 'var(--primary-accent)',
        strokeWidth: 2,
        fill: 'none',
    },
    progressPoint: {
        fill: 'var(--primary-accent)',
        stroke: 'var(--surface)',
        strokeWidth: 2,
    },
    centeredMessage: {
        textAlign: 'center',
        padding: '20px',
        color: 'var(--text-secondary)',
        fontSize: '14px',
    },
    statsPage: {
        padding: '0 16px',
        animation: 'fadeInUp 0.5s ease-out forwards',
    },
    pageHeader: {
        padding: '16px 0',
        textAlign: 'center',
    },
    pageTitle: {
        fontSize: '28px',
        fontWeight: 800,
        margin: 0,
    },
    pageSubtitle: {
        margin: '4px 0 0',
        fontSize: '16px',
        color: 'var(--text-secondary)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '16px',
    },
    chartCard: {
        minHeight: '250px',
    },
    chartContainer: {
        height: '200px',
    },
    barChart: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        alignItems: 'flex-end',
        gap: '8px',
    },
    barWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    bar: {
        width: '80%',
        backgroundColor: 'var(--primary-accent)',
        borderRadius: '4px',
        transition: 'height 0.5s ease-out',
    },
    barLabel: {
        fontSize: '12px',
        color: 'var(--text-secondary)',
    },
    doughnutContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        height: '200px',
    },
    doughnutChart: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    doughnutInnerCircle: {
        width: '70px',
        height: '70px',
        backgroundColor: 'var(--surface)',
        borderRadius: '50%',
    },
    legendContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    legendColorBox: {
        width: '14px',
        height: '14px',
        borderRadius: '4px',
    },
    legendText: {
        fontSize: '14px',
    },
    focusCard: {
    },
    focusContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    focusItem: {
        
    },
    focusName: {
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '4px',
        display: 'block',
    },
    focusBarBackground: {
        height: '8px',
        backgroundColor: 'var(--button-bg)',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    focusBar: {
        height: '100%',
        background: 'linear-gradient(90deg, var(--secondary-accent), var(--primary-accent))',
        borderRadius: '4px',
        transition: 'width 0.5s ease-out',
    },
    libraryPage: {
        padding: '0 16px',
    },
    libraryTabs: {
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '16px',
    },
    libraryTab: {
        flex: 1,
        padding: '12px',
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        marginBottom: '-1px',
    },
    activeLibraryTab: {
        color: 'var(--primary-accent)',
        borderBottomColor: 'var(--primary-accent)',
    },
    libraryActions: {
        display: 'flex',
        gap: '12px',
        marginBottom: '16px',
    },
    addExerciseButton: {
        padding: '0 16px',
        background: 'var(--button-bg)',
        border: 'none',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontWeight: 600,
        cursor: 'pointer',
    },
    categoryGroup: {
        marginBottom: '8px',
    },
    categoryTitleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '12px 0',
        borderBottom: '1px solid var(--border-color)',
    },
    categoryTitle: {
        fontSize: '20px',
        fontWeight: 700,
        margin: 0,
    },
    chevronIcon: {
        width: '20px',
        height: '20px',
        color: 'var(--text-secondary)',
    },
    exerciseList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingTop: '12px',
    },
    exerciseListItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        background: 'var(--button-bg)',
        borderRadius: '12px',
        cursor: 'pointer',
    },
    exerciseName: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 600,
    },
    exerciseMuscles: {
        margin: '2px 0 0',
        fontSize: '12px',
        color: 'var(--text-secondary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    exerciseInfo: {
        flex: 1,
        minWidth: 0,
    },
    addIcon: {
        fontSize: '24px',
        color: 'var(--primary-accent)',
        fontWeight: 300
    },
    routinesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    routineCard: {
        background: 'var(--surface)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid var(--border-color)',
    },
    routineTitle: {
        marginTop: 0,
        fontSize: '18px',
        fontWeight: 700,
    },
    routineDescription: {
        color: 'var(--text-secondary)',
        fontSize: '14px',
        lineHeight: 1.5,
    },
    routineSplit: {
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '12px',
    },
    routineDay: {
        fontSize: '14px',
    },
    routineExerciseList: {
        paddingLeft: '20px',
        margin: '4px 0 0',
        color: 'var(--text-secondary)',
    },
    startRoutineButton: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(90deg, var(--primary-accent), var(--secondary-accent))',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
        marginTop: '16px',
    },
    addCustomForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        background: 'var(--button-bg)',
        borderRadius: '12px',
        marginBottom: '16px',
    },
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);