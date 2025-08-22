-- AI Tools Discovery Platform Database Schema
-- Based on Future Tools dataset analysis

-- 1. Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tools Table (Main entity)
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    upvote_count INTEGER DEFAULT 0,
    tool_url VARCHAR(500),
    image_url VARCHAR(500),
    external_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, pending
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Indexes for performance
    INDEX idx_tools_category (category_id),
    INDEX idx_tools_upvotes (upvote_count DESC),
    INDEX idx_tools_status (status),
    INDEX idx_tools_featured (featured),
    INDEX idx_tools_created (created_at DESC)
);

-- 3. Users Table (for future user features)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    full_name VARCHAR(255),
    avatar_url VARCHAR(500),
    role VARCHAR(20) DEFAULT 'user', -- user, admin, moderator
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. User Interactions (upvotes, favorites, etc.)
CREATE TABLE user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
    interaction_type VARCHAR(20) NOT NULL, -- upvote, favorite, view, share
    metadata JSONB, -- Additional interaction data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, tool_id, interaction_type),
    INDEX idx_interactions_user (user_id),
    INDEX idx_interactions_tool (tool_id),
    INDEX idx_interactions_type (interaction_type)
);

-- 5. Tags Table (for flexible categorization)
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(7), -- Hex color code
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tool Tags (Many-to-Many relationship)
CREATE TABLE tool_tags (
    tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id),
    INDEX idx_tool_tags_tool (tool_id),
    INDEX idx_tool_tags_tag (tag_id)
);

-- 7. Analytics Events (for tracking and insights)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL, -- page_view, tool_click, search, etc.
    tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_analytics_type (event_type),
    INDEX idx_analytics_tool (tool_id),
    INDEX idx_analytics_created (created_at),
    INDEX idx_analytics_session (session_id)
);

-- 8. Search Queries (for search optimization)
CREATE TABLE search_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query TEXT NOT NULL,
    results_count INTEGER,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    clicked_tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_search_query (query),
    INDEX idx_search_created (created_at)
);

-- Views for common queries
CREATE VIEW popular_tools AS
SELECT t.*, c.name as category_name
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
ORDER BY t.upvote_count DESC;

CREATE VIEW category_stats AS
SELECT 
    c.name,
    COUNT(t.id) as tool_count,
    AVG(t.upvote_count) as avg_upvotes,
    SUM(t.upvote_count) as total_upvotes
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name;
