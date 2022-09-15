package gov.samhsa.ocp.smartcore.domain;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface LaunchRepository extends PagingAndSortingRepository<Launch, String> {
    default Optional<Launch> findById(String id) {
        return Optional.ofNullable(findOne(id));
    }

    Optional<Launch> findByIdAndUser(String id, String user);
}
