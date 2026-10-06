



export const projects = [
        {
            "id": "booking-system", "title": "Booking Management System", "status": "Completed", "category": "Software Engineering", "featured": true, "shortDescription": "Desktop booking workflows built around OOP, validation and business logic.", "businessProblem": "Manage booking workflows with structured domain entities and clear interactions.",
            "requirements": ["Manage booking workflows", "Model domain entities", "Validate business rules", "Provide usable UI"], "solution": "Java Swing application separated into UI, domain and application responsibilities.", "architecture": ["Presentation", "Application logic", "Domain models", "Persistence"], "technologies": ["Java", "OOP", "Java Swing", "DSA"],
            "aiCapabilities": [],
            "engineeringFeatures": ["OOP", "Validation", "Business logic"],
            "challenges": ["Keeping UI aligned with domain logic"],
            "decisions": ["Separate UI from domain behavior"],
            "results": ["Completed academic software engineering project."]
        },
        {
            "id": "fertilizer-recommendation", "title": "Fertilizer Recommendation System", "status": "Completed", "category": "Machine Learning", "featured": true, "shortDescription": "End-to-end ML pipeline for agricultural recommendation.", "businessProblem": "Support fertilizer selection using learned patterns from agricultural data.", "requirements": ["Prepare data", "Engineer features", "Train models", "Evaluate models"],
            "solution": "Pipeline connecting preprocessing, feature engineering, training and recommendation.", "architecture": ["Input", "Preprocessing", "Features", "Training", "Evaluation", "Recommendation"],
            "technologies": ["Python", "Scikit-learn", "Pandas", "NumPy"],
            "aiCapabilities": ["Prediction", "Feature Engineering"],
            "engineeringFeatures": ["Pipeline design", "Evaluation", "Application integration"],
            "challenges": ["Feature selection"],
            "decisions": ["Make preprocessing a first-class stage"],
            "results": ["Completed end-to-end ML training project."]
        }, {
            "id": "trainrides-analysis", "title": "TrainRides Data Analysis", "status": "Completed", "category": "Data Analysis", "featured": true, "shortDescription": "Transportation analysis from raw data through ETL, modeling and reporting.", "businessProblem": "Turn operational transportation data into decision-ready information.",
            "requirements": ["Clean data", "Transform data", "Analyze dimensions", "Build reports"], "solution": "Python and BI workflow for preparation, modeling and reporting.",
            "architecture": ["Source", "ETL", "Data model", "Analysis", "Dashboard"],
            "technologies": ["Python", "Pandas", "SQL", "Power BI", "Excel"],
            "aiCapabilities": [],
            "engineeringFeatures": ["ETL", "Data modeling", "Reporting"],
            "challenges": ["Creating analysis-ready structures"],
            "decisions": ["Separate preparation from presentation"],
            "results": ["Completed data analysis graduation project."]
        }, {
            "id": "ticket-classification-llm", "title": "Ticket Classification LLM System", "status": "In Progress", "category": "Agentic AI", "featured": true, "shortDescription": "Application-oriented ticket classification workflow using structured language-model output.", "businessProblem": "Convert unstructured support tickets into structured classifications.",
            "requirements": ["Accept ticket text", "Classify tickets", "Return structured output", "Integrate with APIs"], "solution": "LLM classification treated as a system component rather than an isolated prompt.", "architecture": ["Input", "API", "Inference", "Structured output", "Workflow"], "technologies": ["Python", "LLMs", "Generative AI", "APIs"], "aiCapabilities": ["LLM inference", "Structured output"],
            "engineeringFeatures": ["API design", "Separation of concerns"],
            "challenges": ["Reliable structured outputs"],
            "decisions": ["Treat inference as an application component"],
            "results": ["Active project work; no unsupported production metrics."]
        }
    ]