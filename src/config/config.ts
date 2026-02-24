interface App {
  vite_appwrite_url: string;
  vite_appwrite_project_id: string;
  vite_appwrite_db_id: string;
  vite_appwrite_collection_id: string;
  vite_appwrite_bucket_id: string;
}

const config: App = {
  vite_appwrite_url: import.meta.env.VITE_APPWRITE_URL!,
  vite_appwrite_project_id: import.meta.env.VITE_APPWRITE_PROJECT_ID!,
  vite_appwrite_db_id: import.meta.env.VITE_APPWRITE_DB_ID!,
  vite_appwrite_collection_id: import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
  vite_appwrite_bucket_id: import.meta.env.VITE_APPWRITE_BUCKET_ID!,
};


Object.entries(config).forEach(([key, value]) => {
  if(!value){
    throw new Error(`Missing env variable: ${key}`);
  }
})

export default config;
