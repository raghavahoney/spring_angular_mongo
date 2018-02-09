package com.programmingfree.springservice;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends MongoRepository<User, Integer> {

    @Query("{ 'username' : {$regex: ?0, $options: 'i' }}")
    User findByUserName(final String username);

}
