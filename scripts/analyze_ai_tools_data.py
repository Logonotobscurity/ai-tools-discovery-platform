import pandas as pd
import numpy as np
import json
from collections import Counter
import re
import requests

def load_csv_datasets():
    """Load all CSV datasets from the provided URLs"""
    datasets = {}
    
    # Load AI Tools Dataset
    print("🔍 Loading AI Tools Dataset...")
    ai_tools_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai_tools_dataset_clean%20%281%29-pM2MrsaSpdOgk3SiZ095hSmKCScp6M.csv"
    try:
        datasets['ai_tools'] = pd.read_csv(ai_tools_url)
        print(f"✅ AI Tools: {len(datasets['ai_tools'])} records loaded")
    except Exception as e:
        print(f"❌ Error loading AI Tools dataset: {e}")
        datasets['ai_tools'] = pd.DataFrame()
    
    # Load Growth Hacking Dataset
    print("📈 Loading Growth Hacking Dataset...")
    growth_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/growth-hacking-uf017RAzLE0KOzXt60TnQokrAOORnJ.csv"
    try:
        datasets['growth_hacking'] = pd.read_csv(growth_url)
        print(f"✅ Growth Hacking: {len(datasets['growth_hacking'])} records loaded")
    except Exception as e:
        print(f"❌ Error loading Growth Hacking dataset: {e}")
        datasets['growth_hacking'] = pd.DataFrame()
    
    # Load Startup Journey Dataset
    print("🚀 Loading Startup Journey Dataset...")
    startup_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startup-journey-GoACLGXezsXy5RlR6TjYRBEGdr6Bgj.csv"
    try:
        datasets['startup_journey'] = pd.read_csv(startup_url)
        print(f"✅ Startup Journey: {len(datasets['startup_journey'])} records loaded")
    except Exception as e:
        print(f"❌ Error loading Startup Journey dataset: {e}")
        datasets['startup_journey'] = pd.DataFrame()
    
    # Load Developer Journey Dataset
    print("💻 Loading Developer Journey Dataset...")
    developer_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/developer-journey-2LdYYFHpz76GsgqGgxvBzTyxbAXr71.csv"
    try:
        datasets['developer_journey'] = pd.read_csv(developer_url)
        print(f"✅ Developer Journey: {len(datasets['developer_journey'])} records loaded")
    except Exception as e:
        print(f"❌ Error loading Developer Journey dataset: {e}")
        datasets['developer_journey'] = pd.DataFrame()
    
    # Load AI Frameworks Dataset
    print("🤖 Loading AI Frameworks Dataset...")
    frameworks_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frameworks%20-%20AI%20Agent%20Tool-2zdrY7xpkHhH32gyKrHuc0LAeMKfi1.csv"
    try:
        datasets['ai_frameworks'] = pd.read_csv(frameworks_url)
        print(f"✅ AI Frameworks: {len(datasets['ai_frameworks'])} records loaded")
    except Exception as e:
        print(f"❌ Error loading AI Frameworks dataset: {e}")
        datasets['ai_frameworks'] = pd.DataFrame()
    
    return datasets

def normalize_datasets(datasets):
    """Normalize all datasets to a common schema"""
    normalized_tools = []
    
    # Process AI Tools Dataset
    if not datasets['ai_tools'].empty:
        ai_df = datasets['ai_tools']
        for _, row in ai_df.iterrows():
            tool = {
                "Tool Name": row.get('Tool Name', ''),
                "Tool Description": row.get('Tool Description', ''),
                "Tool Category": row.get('Tool Category', 'AI Tools'),
                "Tool URL": row.get('Tool URL', ''),
                "Tool Image URL": row.get('Tool Image URL', '/placeholder.svg?height=200&width=300'),
                "External Link URL": row.get('External Link URL', ''),
                "Upvote_Count": str(row.get('Upvote_Count', 0)),
                "Tool_Slug": row.get('Tool_Slug', ''),
                "External_Slug": row.get('External_Slug', ''),
                "Source": "AI Tools Dataset",
                "Journey": "AI Journey"
            }
            normalized_tools.append(tool)
    
    # Process Growth Hacking Dataset
    if not datasets['growth_hacking'].empty:
        growth_df = datasets['growth_hacking']
        for _, row in growth_df.iterrows():
            # Use tools__ prefixed columns if available, otherwise use main columns
            tool_name = row.get('tools__name', row.get('name', ''))
            tool_desc = row.get('tools__description', row.get('description', ''))
            tool_category = row.get('tools__category', row.get('category', 'Growth Hacking'))
            tool_url = row.get('tools__url', row.get('url', ''))
            tool_rating = row.get('tools__rating', 0)
            
            if tool_name:  # Only add if we have a tool name
                tool = {
                    "Tool Name": tool_name,
                    "Tool Description": tool_desc,
                    "Tool Category": tool_category,
                    "Tool URL": tool_url,
                    "Tool Image URL": '/placeholder.svg?height=200&width=300',
                    "External Link URL": tool_url,
                    "Upvote_Count": str(int(float(tool_rating) * 1000)) if tool_rating else "0",
                    "Tool_Slug": row.get('tools__id', ''),
                    "External_Slug": row.get('tools__id', ''),
                    "Source": "Growth Hacking Dataset",
                    "Pricing": row.get('tools__pricing', ''),
                    "Subcategory": row.get('tools__subcategory', ''),
                    "Growth_Stage": row.get('tools__growthFunnelStage', ''),
                    "Featured": row.get('tools__featured', False),
                    "Journey": "Growth Journey"
                }
                normalized_tools.append(tool)
    
    # Process Startup Journey Dataset
    if not datasets['startup_journey'].empty:
        startup_df = datasets['startup_journey']
        for _, row in startup_df.iterrows():
            tool = {
                "Tool Name": row.get('name', ''),
                "Tool Description": row.get('description', ''),
                "Tool Category": row.get('category', 'Startup Tools').replace('🎁 ', ''),
                "Tool URL": row.get('url', ''),
                "Tool Image URL": '/placeholder.svg?height=200&width=300',
                "External Link URL": row.get('url', ''),
                "Upvote_Count": "1000",  # Default upvote count for startup tools
                "Tool_Slug": '',
                "External_Slug": '',
                "Source": "Startup Journey Dataset",
                "Journey": "Startup Journey"
            }
            normalized_tools.append(tool)
    
    # Process Developer Journey Dataset
    if not datasets['developer_journey'].empty:
        developer_df = datasets['developer_journey']
        for _, row in developer_df.iterrows():
            # Handle items__ prefixed columns
            tool_name = row.get('items__name', row.get('name', ''))
            tool_desc = row.get('items__description', row.get('description', ''))
            tool_url = row.get('items__url', row.get('url', ''))
            
            if tool_name:  # Only add if we have a tool name
                tool = {
                    "Tool Name": tool_name,
                    "Tool Description": tool_desc,
                    "Tool Category": row.get('category', 'Developer Tools'),
                    "Tool URL": tool_url,
                    "Tool Image URL": '/placeholder.svg?height=200&width=300',
                    "External Link URL": tool_url,
                    "Upvote_Count": "1500",  # Default upvote count for developer tools
                    "Tool_Slug": '',
                    "External_Slug": '',
                    "Source": "Developer Journey Dataset",
                    "Journey": "Developer Journey"
                }
                normalized_tools.append(tool)
    
    # Process AI Frameworks Dataset
    if not datasets['ai_frameworks'].empty:
        frameworks_df = datasets['ai_frameworks']
        for _, row in frameworks_df.iterrows():
            tool = {
                "Tool Name": row.get('FrameworkName', ''),
                "Tool Description": row.get('Description', ''),
                "Tool Category": "AI Frameworks",
                "Tool URL": row.get('WebsiteLink', ''),
                "Tool Image URL": '/placeholder.svg?height=200&width=300',
                "External Link URL": row.get('GithubLink', ''),
                "Upvote_Count": "2000",  # Default upvote count for frameworks
                "Tool_Slug": '',
                "External_Slug": '',
                "Source": "AI Frameworks Dataset",
                "Journey": "AI Journey",
                "Framework_Focus": row.get('Focus', ''),
                "Framework_Capabilities": row.get('Capabilities', ''),
                "Framework_Chains": row.get('Chains', ''),
                "Framework_Edge": row.get('Edge', '')
            }
            normalized_tools.append(tool)
    
    return pd.DataFrame(normalized_tools)

datasets = load_csv_datasets()

print("🔄 Normalizing and merging datasets...")
combined_df = normalize_datasets(datasets)

# Remove duplicates based on tool name (case-insensitive)
print("🧹 Removing duplicates...")
combined_df['Tool Name Lower'] = combined_df['Tool Name'].str.lower()
combined_df = combined_df.drop_duplicates(subset=['Tool Name Lower'], keep='first')
combined_df = combined_df.drop('Tool Name Lower', axis=1)

print(f"📊 Combined Dataset Overview:")
for dataset_name, df in datasets.items():
    print(f"{dataset_name}: {len(df)} records")
print(f"Total combined tools: {len(combined_df)}")
print(f"Columns: {list(combined_df.columns)}")

# Data Quality Analysis
print("\n🔍 Data Quality Analysis:")
print("Missing values per column:")
missing_data = combined_df.isnull().sum()
for col, missing in missing_data.items():
    if missing > 0:
        print(f"  {col}: {missing} ({missing/len(combined_df)*100:.1f}%)")

# Check for duplicates
duplicates = combined_df.duplicated().sum()
print(f"Duplicate rows: {duplicates}")

# Convert upvote count to numeric
combined_df['Upvote_Count'] = pd.to_numeric(combined_df['Upvote_Count'], errors='coerce')

# Category Analysis
print("\n📈 Category Analysis:")
category_counts = combined_df['Tool Category'].value_counts()
print(f"Total categories: {len(category_counts)}")
print("Top 20 categories:")
for i, (category, count) in enumerate(category_counts.head(20).items(), 1):
    print(f"  {i}. {category}: {count} tools")

# Upvote Analysis
print("\n👍 Upvote Analysis:")
upvote_stats = combined_df['Upvote_Count'].describe()
print(f"Average upvotes: {upvote_stats['mean']:.1f}")
print(f"Median upvotes: {upvote_stats['50%']:.1f}")
print(f"Max upvotes: {upvote_stats['max']:.0f}")
print(f"Min upvotes: {upvote_stats['min']:.0f}")

# Top tools by upvotes
print("\n🏆 Top 100 Tools by Upvotes:")
top_tools = combined_df.nlargest(100, 'Upvote_Count')[['Tool Name', 'Tool Category', 'Upvote_Count']]
for i, (_, row) in enumerate(top_tools.iterrows(), 1):
    print(f"  {i}. {row['Tool Name']} ({row['Tool Category']}) - {row['Upvote_Count']} upvotes")

# URL Analysis
print("\n🔗 URL Analysis:")
valid_urls = combined_df['Tool URL'].notna().sum()
valid_images = combined_df['Tool Image URL'].notna().sum()
valid_external = combined_df['External Link URL'].notna().sum()

print(f"Tools with valid URLs: {valid_urls} ({valid_urls/len(combined_df)*100:.1f}%)")
print(f"Tools with images: {valid_images} ({valid_images/len(combined_df)*100:.1f}%)")
print(f"Tools with external links: {valid_external} ({valid_external/len(combined_df)*100:.1f}%)")

# Journey Analysis
print("\n🚀 Journey Analysis:")
journey_counts = combined_df['Journey'].value_counts()
for journey, count in journey_counts.items():
    print(f"  {journey}: {count} tools")

insights = {
    "total_tools": len(combined_df),
    "total_categories": len(category_counts),
    "avg_upvotes": float(upvote_stats['mean']),
    "median_upvotes": float(upvote_stats['50%']),
    "max_upvotes": float(upvote_stats['max']),
    "datasets_loaded": {
        "ai_tools": len(datasets['ai_tools']),
        "growth_hacking": len(datasets['growth_hacking']),
        "startup_journey": len(datasets['startup_journey']),
        "developer_journey": len(datasets['developer_journey']),
        "ai_frameworks": len(datasets['ai_frameworks'])
    },
    "journey_distribution": [
        {"journey": journey, "count": int(count), "percentage": round(count/len(combined_df)*100, 1)}
        for journey, count in journey_counts.items()
    ],
    "top_categories": [
        {"name": cat, "count": int(count)} 
        for cat, count in category_counts.head(20).items()
    ],
    "top_tools": [
        {
            "name": row['Tool Name'],
            "category": row['Tool Category'],
            "upvotes": int(row['Upvote_Count']) if pd.notna(row['Upvote_Count']) else 0,
            "url": row['Tool URL'] if pd.notna(row['Tool URL']) else "",
            "image": row['Tool Image URL'] if pd.notna(row['Tool Image URL']) else "",
            "description": row['Tool Description'] if pd.notna(row['Tool Description']) else "",
            "slug": row['Tool_Slug'] if pd.notna(row['Tool_Slug']) else "",
            "source": row.get('Source', 'Unknown'),
            "journey": row.get('Journey', 'Unknown')
        }
        for _, row in combined_df.nlargest(100, 'Upvote_Count').iterrows()
    ],
    "all_tools": [
        {
            "id": idx + 1,
            "name": row['Tool Name'],
            "description": row['Tool Description'] if pd.notna(row['Tool Description']) else "",
            "category": row['Tool Category'],
            "url": row['Tool URL'] if pd.notna(row['Tool URL']) else "",
            "image_url": row['Tool Image URL'] if pd.notna(row['Tool Image URL']) else "",
            "external_url": row['External Link URL'] if pd.notna(row['External Link URL']) else "",
            "upvotes": int(row['Upvote_Count']) if pd.notna(row['Upvote_Count']) else 0,
            "slug": row['Tool_Slug'] if pd.notna(row['Tool_Slug']) else "",
            "external_slug": row['External_Slug'] if pd.notna(row['External_Slug']) else "",
            "featured": int(row['Upvote_Count']) > 3000 if pd.notna(row['Upvote_Count']) else False,
            "source": row.get('Source', 'Unknown'),
            "journey": row.get('Journey', 'Unknown'),
            "pricing": row.get('Pricing', ''),
            "subcategory": row.get('Subcategory', ''),
            "growth_stage": row.get('Growth_Stage', ''),
            "framework_focus": row.get('Framework_Focus', ''),
            "framework_capabilities": row.get('Framework_Capabilities', '')
        }
        for idx, (_, row) in enumerate(combined_df.iterrows())
    ],
    "data_quality": {
        "missing_urls": int(combined_df['Tool URL'].isnull().sum()),
        "missing_images": int(combined_df['Tool Image URL'].isnull().sum()),
        "missing_descriptions": int(combined_df['Tool Description'].isnull().sum()),
        "duplicates": int(duplicates),
        "completion_rate": round((1 - (missing_data.sum().sum() / (len(combined_df) * len(combined_df.columns)))) * 100, 1)
    },
    "statistics": {
        "total_tools": len(combined_df),
        "total_categories": len(category_counts),
        "avg_upvotes_per_tool": round(float(upvote_stats['mean']), 1),
        "highest_upvoted_tool": combined_df.loc[combined_df['Upvote_Count'].idxmax(), 'Tool Name'] if not combined_df['Upvote_Count'].isna().all() else "N/A",
        "most_popular_category": category_counts.index[0] if len(category_counts) > 0 else "N/A"
    }
}

print(f"\n✅ Analysis complete! Generated insights for {len(combined_df)} tools across {len(category_counts)} categories.")
print(f"📊 Combined all 5 datasets: AI Tools + Growth Hacking + Startup Journey + Developer Journey + AI Frameworks")
print(f"🎯 Total platform resources: ~{len(combined_df)} tools serving 4 target audiences")

# Save insights to a JSON file for the frontend
with open('public/ai-tools-insights.json', 'w') as f:
    json.dump(insights, f, indent=2)

print("💾 Comprehensive insights saved to public/ai-tools-insights.json")
print("🚀 Platform ready with multi-journey navigation and resource discovery")
